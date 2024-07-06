'use client';

import { BoxButton } from '@repo/ui/Button';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@repo/ui';
import { ResetPasswordDataType, resetPasswordSchema } from '@/lib/validator';
import { zodResolver } from '@hookform/resolvers/zod';

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [isCheck, setIsCheck] = useState({
    password: false,
    passwordConfirm: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<ResetPasswordDataType>({
    mode: 'onChange',
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  //비밀번호 성공메세지 출력을 위한 useEffect
  useEffect(() => {
    if (!errors.password && password.length >= 8) {
      setIsCheck(state => ({ ...state, password: true }));
    } else {
      setIsCheck(state => ({ ...state, password: false }));
    }
  }, [errors.password, password]);

  //비밀번호 확인 성공메세지 출력을 위한 useEffect
  useEffect(() => {
    if (
      password &&
      passwordConfirm &&
      password.length >= 8 &&
      passwordConfirm.length >= 8
    ) {
      if (!errors.password && password !== passwordConfirm) {
        setIsCheck(state => ({ ...state, passwordConfirm: false }));
        setError('passwordConfirm', {
          message: '비밀번호가 일치하지 않습니다.',
        });
      } else if (passwordConfirm.length >= 8 && password === passwordConfirm) {
        clearErrors('passwordConfirm');
        setIsCheck(prev => ({ ...prev, passwordConfirm: true }));
      }
    }
  }, [password, passwordConfirm, errors.password]);

  const submitResetPassword = async (data: ResetPasswordDataType) => {
    if (!token) {
      alert('토큰이 없습니다');
      return;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/findpassword/confirm`,
      {
        method: 'POST',
        body: JSON.stringify({ ...data, token }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      //나중에 오류처리 수정
      alert('오류가 발생했습니다');
      return router.push('/');
    }
    alert('비밀번호가 변경되었습니다.');
    return router.push('/');
  };
  return (
    <form
      className='flex flex-col gap-8'
      onSubmit={handleSubmit(submitResetPassword)}
    >
      <div className='flex w-[400px] flex-col gap-3'>
        <div className='text-B1M16'>새 비밀번호</div>
        <Input
          type='password'
          hint={'8자 이상, 최소한 특수문자가 1개는 포함되어야 합니다'}
          successMessage={isCheck.password && '사용가능한 비밀번호 입니다.'}
          errorMessage={errors.password?.message}
          {...register('password')}
        />
      </div>
      <div className='flex w-[400px] flex-col gap-3'>
        <div className='text-B1M16'>새 비밀번호 확인</div>
        <Input
          type='password'
          hint='비밀번호를 한 번 더 입력해 주세요.'
          errorMessage={errors.passwordConfirm?.message}
          successMessage={isCheck.passwordConfirm && '비밀번호가 일치합니다.'}
          {...register('passwordConfirm', {
            required: '비밀번호를 한 번 더 입력해 주세요.',
          })}
        />
      </div>

      <BoxButton type='submit' size='large' style='solid'>
        확인
      </BoxButton>
    </form>
  );
}
