import { profileEditDataType } from '@/lib/validator';
import { Input } from '@repo/ui';
import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import type {
  Control,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormTrigger,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
interface EditUrlPros {
  register: UseFormRegister<profileEditDataType>;
  control: Control<profileEditDataType>;
  setError: UseFormSetError<profileEditDataType>;
  trigger: UseFormTrigger<profileEditDataType>;
  clearErrors: UseFormClearErrors<profileEditDataType>;
  setIsChecking: React.Dispatch<React.SetStateAction<boolean>>;
}
export const EditUrl = ({
  control,
  register,
  trigger,
  setError,
  clearErrors,
  setIsChecking,
}: EditUrlPros) => {
  //react hook form controller
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name: 'pageUrl',
  });
  //url 중복검사 통과 때 상태
  const [isPass, setIsPass] = useState(false);
  //pageUrl 초기값
  const [initValue] = useState(field.value);

  useEffect(() => {
    //초기값이랑 같다면 성공, 오류메세지 초기화
    if (initValue === field.value) {
      setIsPass(() => false);
      clearErrors('pageUrl');
      return;
    }
    //값이 존재, 에러가 없을 때, 초기값고 다를때 중복체크 검사
    if (field.value && initValue !== field.value) {
      handleCheckUrl('pageUrl', field.value);
    }
  }, [field.value, initValue]);

  //pageURL 중복체크 함수
  const handleCheckUrl = useCallback(
    debounce(async (type, data) => {
      //중복체크전 url 영문자만 있는지 수동으로 체크
      const triggerResult = await trigger('pageUrl');
      if (!triggerResult) return;
      clearErrors('pageUrl');
      setIsPass(() => false); //닉네임 중복검사 통과메세지를 위한 상태
      setIsChecking(() => true); //중복 검사중일때 제출 버튼 비활성화를 위한 상태
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
        setError('pageUrl', { message: '이미 사용 중인 URL 입니다.' });
      } else {
        setIsPass(() => true);
      }
      setIsChecking(() => false);
    }, 500),
    [],
  );
  return (
    <div className='flex flex-col gap-2'>
      <div className='border-neutral-70 flex h-10 w-full rounded-md border'>
        <div className='bg-neutral-70 text-B2R14 flex h-full w-[124px] items-center justify-center text-white'>
          sfaclog.kr/
        </div>
        <Input
          {...register('pageUrl')}
          errorMessage={error?.message}
          successMessage={isPass && '사용 가능한 URL 입니다.'}
          type='text'
          className='text-B2R14 text-neutral-70 w-[calc(100%-130px)] border-none p-2.5 outline-none'
        />
      </div>
    </div>
  );
};
