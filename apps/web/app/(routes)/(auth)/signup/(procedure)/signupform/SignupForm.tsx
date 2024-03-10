'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Check, Input } from '@repo/ui';
import { BoxButton } from '@repo/ui/Button';
import { useRouter } from 'next/navigation';
import { SignUpSubmitAction, CheckDuplication } from './action';
import type { CheckDuplicationProps } from './action';
import { zodResolver } from '@hookform/resolvers/zod';
import _, { debounce } from 'lodash';
import { SignupSchema } from '@/lib/validator';
import type { SignupDataType } from '@/lib/validator';
import Loading from '@/(routes)/loadingSpinner';

const interestsList = [
  { label: '프론트엔드', value: 'Frontend' },
  { label: '백엔드', value: 'Backend' },
  { label: '데이터 분석', value: 'Data' },
  { label: '서버 개발', value: 'Server' },
  { label: 'DBA', value: 'DBA' },
  { label: 'iOS 개발', value: 'iOS' },
  { label: '안드로이드 개발', value: 'Android' },
];

const offersList = [
  { label: '채용 제안', value: 'Recruitment' },
  { label: '의견 제안', value: 'Opinion' },
  { label: '프로젝트 제안', value: 'Project' },
];

const duplErrorMsg = {
  username: '이미 사용중인 아이디입니다.',
  email: '이미 사용중인 이메일입니다.',
  nickname: '이미 사용중인 닉네임입니다.',
};

const successMsg = {
  username: '사용가능한 아이디입니다.',
  email: '사용가능한 이메일입니다.',
  nickname: '사용가능한 닉네임입니다.',
  password: '사용가능한 비밀번호입니다.',
  passwordConfirm: '비밀번호가 일치합니다.',
};

/**
 * @description 유효성검사 zod -> DB에서 중복체크 -> 성공 메세지
 */
export function SignupForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheck, setIsCheck] = useState({
    username: false,
    email: false,
    nickname: false,
    password: false,
    passwordConfirm: false,
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [offers, setOffers] = useState<string[]>([]);

  //관심분야 체크박스 핸들러
  const handleInterests = ({ value }: { value: string }) => {
    if (interests.includes(value)) {
      setInterests(prev => prev.filter(el => el !== value));
    } else {
      setInterests(prev => [...prev, value]);
    }
  };

  //제안 허용 체크박스 핸들러
  const handleOffers = ({ value }: { value: string }) => {
    if (offers.includes(value)) {
      setOffers(prev => prev.filter(el => el !== value));
    } else {
      setOffers(prev => [...prev, value]);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<SignupDataType>({
    mode: 'onChange',
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: '',
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
    },
  });
  const watchedFields = watch();

  const handleCheckDupl = useCallback(
    debounce(
      async (
        type: CheckDuplicationProps['type'],
        data: CheckDuplicationProps['data'],
      ) => {
        const { isDuplicate, error } = await CheckDuplication(type, data);
        if (!isDuplicate) {
          //isDuplicate == false -> 중복된 값이 없음
          return setIsCheck(prev => ({ ...prev, [type]: true }));
        } else if (isDuplicate && !error) {
          //isDuplicate == true -> 중복된 값이 있음
          setIsCheck(prev => ({ ...prev, [type]: false }));
          return setError(type, { message: duplErrorMsg[type] });
        } else if (error) {
          throw new Error('중복체크 중 오류가 발생했습니다.');
        }
      },
      300,
    ),
    [],
  );
  useEffect(() => {
    //에러가 없고 아이디 값이 존재할 때 아이디 중복 체크
    if (!errors.username && watchedFields.username.length >= 5) {
      handleCheckDupl('username', watchedFields.username);
    }
  }, [watchedFields.username, errors.username, handleCheckDupl]);

  useEffect(() => {
    //에러가 없고 이메일 값이 존재할 때 아이디 중복 체크
    if (!errors.email && watchedFields.email.length >= 1) {
      handleCheckDupl('email', watchedFields.email);
    }
  }, [watchedFields.email, errors.email]);

  useEffect(() => {
    //에러가 없고 닉네임 값이 존재할 때 아이디 중복 체크
    if (!errors.nickname && watchedFields.nickname.length >= 2) {
      handleCheckDupl('nickname', watchedFields.nickname);
    }
  }, [watchedFields.nickname, errors.nickname]);

  useEffect(() => {
    /**
     * zod는 passwordConfirm이 변경될 때마다 password와 같은지 확인하고
     * 다르면 passwordConfirm에 에러를 추가한다. 하지만 onChange mode 에서
     * 두 요소가 동일한 경우에서 password가 변경되었을 때는 passwordConfirm과 동일한지는 확인하지 않기 때문에
     * 밑의 로직이 필요함
     */
    if (
      watchedFields.password &&
      watchedFields.passwordConfirm &&
      watchedFields.password.length >= 8 &&
      watchedFields.passwordConfirm.length >= 8
    ) {
      if (watchedFields.password !== watchedFields.passwordConfirm) {
        setIsCheck(prev => ({ ...prev, passwordConfirm: false }));
        setError('passwordConfirm', {
          message: '비밀번호가 일치하지 않습니다.',
        });
      } else {
        clearErrors('passwordConfirm');
        setIsCheck(prev => ({ ...prev, passwordConfirm: true }));
      }
    }

    //에러가 없고, password가 8자 이상일 때 success message를 위한 state 변경
    if (!errors.password && watchedFields.password.length >= 8) {
      setIsCheck(prev => ({ ...prev, password: true }));
    } else if (errors.password) {
      setIsCheck(prev => ({ ...prev, password: false }));
    }
  }, [watchedFields.password, watchedFields.passwordConfirm, errors.password]);

  //form submit
  const handleFormSubmit = async (formData: any) => {
    console.log('form data =', formData, isCheck);
    setIsSubmitting(() => true);
    if (!_.every(isCheck, Boolean) || !formData) {
      //다시 한번 유효성 검사
      setIsSubmitting(() => false);
      return alert('입력값을 확인해주세요.');
    }
    formData = { ...formData, interests, offers };
    console.log('submit data', formData);
    const result = await SignUpSubmitAction(formData);

    if (result.success) {
      //회원가입 성공시 이메일 발송 완료 페이지로 이동
      router.push(`/signup/verify?email=${formData.email}`);
    } else {
      //회원가입 실패시 메인페이지로 이동
      setIsSubmitting(() => false);
      alert('오류가 발생 하였습니다.');
      router.push('/');
    }
  };

  return (
    <>
      {isSubmitting && <Loading />}
      <form onSubmit={handleSubmit(handleFormSubmit)} className='mx-auto w-fit'>
        <div className='flex flex-col gap-6'>
          <div className='flex w-[400px] flex-col gap-3'>
            <div className='text-B1M16'>아이디</div>
            <Input
              type='text'
              placeholder='아이디를 입력해주세요'
              hint='5~20자 이내로 입력해주세요.'
              errorMessage={errors.username?.message}
              successMessage={isCheck.username && successMsg['username']}
              {...register('username')}
            />
          </div>
          <div className='flex w-[400px] flex-col gap-3'>
            <div className='text-B1M16'>이름</div>
            <Input
              type='text'
              placeholder='성함을 입력해주세요'
              errorMessage={errors.legalname?.message}
              {...register('legalname')}
            />
          </div>
          <div className='flex w-[400px] flex-col gap-3'>
            <div className='text-B1M16'>닉네임</div>
            <Input
              type='text'
              hint='2~12자 이내로 입력해주세요.'
              placeholder='닉네임을 입력해 주세요.'
              errorMessage={errors.nickname?.message}
              successMessage={isCheck.nickname && successMsg['nickname']}
              {...register('nickname')}
            />
          </div>
          <div className='flex w-[400px] flex-col gap-3'>
            <div className='text-B1M16'>이메일</div>
            <Input
              type='text'
              placeholder='ABCD123@gmail.com'
              hint='기입하신 이메일로 인증 메일이 발송됩니다.'
              errorMessage={errors.email?.message}
              successMessage={isCheck.email && successMsg['email']}
              {...register('email')}
            />
          </div>
          <div className='flex w-[400px] flex-col gap-3'>
            <div className='text-B1M16'>비밀번호</div>
            <Input
              type='password'
              hint='8자 이상, 최소한 특수문자가 1개는 포함되어야 합니다'
              errorMessage={errors.password?.message}
              successMessage={isCheck.password && successMsg['password']}
              {...register('password')}
            />
          </div>
          <div className='flex w-[400px] flex-col gap-3'>
            <div className='text-B1M16'>비밀번호 확인</div>
            <Input
              type='password'
              errorMessage={errors.passwordConfirm?.message}
              successMessage={
                isCheck.passwordConfirm && successMsg['passwordConfirm']
              }
              {...register('passwordConfirm')}
            />
          </div>
          <div className='flex w-[400px] flex-col gap-3'>
            <div className='text-B1M16'>관심 분야</div>
            <div className='flex flex-wrap'>
              {interestsList.map(item => (
                <div className='w-1/2' key={item.value}>
                  <Check
                    name='interests'
                    value={item.value}
                    label={item.label}
                    onChange={handleInterests}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='flex w-[400px] flex-col gap-3'>
            <div className='text-B1M16'>제안 허용</div>
            <div className='flex flex-wrap'>
              {offersList.map(item => (
                <div className='w-1/2' key={item.value}>
                  <Check
                    name='offers'
                    value={item.value}
                    label={item.label}
                    onChange={handleOffers}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='mb-32 mt-6 flex flex-col justify-center gap-2.5'>
          <BoxButton
            style='solid'
            size='large'
            type='submit'
            disabled={!_.every(isCheck, Boolean)} // 유효성 검사 및 중복체크 모두 통과해야 버튼 활성화
          >
            다음
          </BoxButton>
        </div>
      </form>
    </>
  );
}
