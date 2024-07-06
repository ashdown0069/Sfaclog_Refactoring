'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input } from '@repo/ui';
import { BoxButton } from '@repo/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FindPasswordDataType } from '@/lib/validator';
import { findPasswordSchema } from '@/lib/validator';

function FindPasswordForm() {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
  } = useForm<FindPasswordDataType>({
    resolver: zodResolver(findPasswordSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  const submitFindPassword = async (data: FindPasswordDataType) => {
    //비빌번호 재설정 이메일 보내기
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/findpassword`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      setError('email', { message: '아이디 또는 이메일이 올바르지 않습니다.' });
      setError('username', {
        message: '아이디 또는 이메일이 올바르지 않습니다.',
      });
      return;
    }
    return router.push(`/findpassword/verify?email=${data.email}`);
  };
  return (
    <form
      className='flex flex-col gap-8'
      onSubmit={handleSubmit(submitFindPassword)}
    >
      <div className='flex flex-col gap-3'>
        <p className='text-B1B16'>아이디</p>
        <Input
          type='text'
          placeholder='아이디을 입력해주세요.'
          errorMessage={errors.username?.message}
          {...register('username')}
        />
      </div>
      <div className='flex flex-col gap-3'>
        <p className='text-B1M16'>이메일</p>
        <div className='flex w-full gap-3'>
          <div className='flex grow flex-col gap-2'>
            <Input
              type='text'
              placeholder='이메일 주소를 입력해주세요.'
              errorMessage={errors.email?.message}
              {...register('email')}
            />
            <p className='text-B3R12 text-neutral-40'>
              이메일 예시: abcde123@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <BoxButton type='submit' size='large' style='solid'>
          다음
        </BoxButton>
        <div className='flex justify-between'>
          <p className='text-B2R14'>비밀번호가 생각나셨나요?</p>
          <Link href={'/login'} className='text-B2R14 underline'>
            로그인하기
          </Link>
        </div>
      </div>
    </form>
  );
}

export default FindPasswordForm;
