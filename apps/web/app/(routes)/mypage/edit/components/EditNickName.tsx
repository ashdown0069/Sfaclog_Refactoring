import type {
  Control,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormTrigger,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import React, { useCallback, useEffect, useState } from 'react';
import { profileEditDataType } from '@/lib/validator';
import { Input } from '@repo/ui';
import { debounce } from 'lodash';
interface EditNickNameProps {
  register: UseFormRegister<profileEditDataType>;
  trigger: UseFormTrigger<profileEditDataType>;
  control: Control<profileEditDataType>;
  setError: UseFormSetError<profileEditDataType>;
  clearErrors: UseFormClearErrors<profileEditDataType>;
  setIsChecking: React.Dispatch<React.SetStateAction<boolean>>;
}
export const EditNickName = ({
  register,
  control,
  setError,
  clearErrors,
  trigger,
  setIsChecking,
}: EditNickNameProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name: 'nickname',
  });
  //닉네임 중복검사 통과 때 상태
  const [isPass, setIsPass] = useState(false);
  //닉네임 초기값
  const [initValue] = useState(field.value);

  useEffect(() => {
    //초기값이랑 같다면 성공, 오류메세지 초기화
    if (initValue === field.value) {
      setIsPass(() => false);
      clearErrors('nickname');
      return;
    }
    //값이 존재, 에러가 없을 때, 초기값고 다를때 중복체크 검사
    if (field.value && initValue !== field.value) {
      handleCheckNickname('nickname', field.value);
    }
  }, [field.value, initValue]);

  //닉네임 중복체크 함수
  const handleCheckNickname = useCallback(
    debounce(async (type, data) => {
      //2 ~ 12자 유효성검사 먼저실행
      const triggerResult = await trigger('nickname');
      if (!triggerResult) return;
      clearErrors('nickname');
      setIsPass(() => false); //닉네임 중복검사 통과메세지를 위한 상태
      setIsChecking(() => true); //중복 검사중일때 제출 버튼 비활성화를 위한 상태
      //닉네임 중복체크
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signup/check?type=${type}&data=${data}`,
        { cache: 'no-cache' },
      );
      if (!res.ok) {
        alert('중복체크 중 오류가 발생했습니다.');
        return;
      }
      const result = await res.json();

      if (result.isDuplicate) {
        //true 일 경우 중복 이므로 에러
        setError('nickname', { message: '이미 사용 중인 닉네임입니다.' });
      } else {
        setIsPass(() => true);
      }
      setIsChecking(() => false); //중복 검사중일때 제출 버튼 비활성화를 위한 상태
    }, 500),
    [],
  );
  return (
    <Input
      {...register('nickname')}
      errorMessage={error?.message}
      successMessage={isPass && '사용 가능한 닉네임 입니다.'}
      className='text-B2M14'
      type='text'
    />
  );
};
