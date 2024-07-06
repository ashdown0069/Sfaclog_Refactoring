'use client';
import React, { useState } from 'react';
import { BoxButton } from '@repo/ui/Button';
import { Selectbox, Input } from '@repo/ui';
import { CautionImg } from '@public/svgs';
import { useForm } from 'react-hook-form';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const selectList = [
  { label: 'UX/UI가 불편해서', value: 'UX/UI' },
  { label: '광고가 너무 많아서', value: 'advertising' },
  { label: '잘 사용하지 않아서', value: 'not using' },
  { label: '개인정보가 걱정되서', value: 'privacy' },
  { label: '중복 계정이 존재해서', value: 'duplicate account' },
  { label: '기타', value: 'etc' },
];

interface DeleteAccountType {
  reason: string;
  password: string;
}

export function DeleteAccountForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<DeleteAccountType>({
    defaultValues: {
      reason: '',
      password: '',
    },
  });

  const handleFormSubmit = async (data: DeleteAccountType) => {
    if (isLoading) return;
    setIsLoading(() => true);
    if (!data.reason) {
      alert('탈퇴사유를 선택해주세요.');
      setIsLoading(() => false);
      return;
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      setError('password', { message: '비밀번호가 일치하지 않습니다.' });
      setIsLoading(() => false);
      return;
    }
    setTimeout(() => {
      toast.success('탈퇴가 완료되었습니다.');
    }, 1000);
    await signOut({ callbackUrl: '/' });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='mx-auto my-10 flex w-[400px] flex-col items-center  justify-center gap-[45px]'
    >
      <div>
        <div className='relative my-[10px] flex justify-center'>
          <CautionImg className='absolute bottom-4 left-7' />
          <span className='text-H3M18 text-text-primary'>주의하세요</span>
        </div>
        <div className='text-B3R12 text-text-secondary'>
          탈퇴시 삭제되니 정보는 복구가 불가능합니다.
        </div>
      </div>
      <div className='flex flex-col gap-6'>
        <div className='text-B2M14 text-text-primary text-center'>
          불편하셨던 점과 불만사항을 알려주시면 적극 반영해 고객님의 불편함을
          해결할 수 있도록 노력하겠습니다.
        </div>
        <div className='flex flex-col gap-3'>
          <div className='text-B1M16 text-text-primary'>
            무엇이 불편하셨나요?
          </div>
          <Selectbox
            placeholder='무엇이 불편하셨나요?'
            selectList={selectList}
            width='long'
            onChange={data => setValue('reason', data.value)}
          />
        </div>
        <div className='flex flex-col gap-3'>
          <div className='text-B1M16 text-text-primary'>비밀번호 입력</div>
          <Input
            disabled={isLoading}
            type='password'
            placeholder='현재 비밀번호를 입력해주세요.'
            errorMessage={errors.password?.message}
            {...register('password', {
              required: '비밀번호를 입력해 주세요.',
            })}
          />
        </div>
      </div>
      <BoxButton size='large' style='solid' type='submit' disabled={isLoading}>
        탈퇴하기
      </BoxButton>
    </form>
  );
}
