'use client';
import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { submitAction } from '../action';
import { useRouter } from 'next/navigation';
import { Input } from '@repo/ui';
import { BoxButton } from '@repo/ui/Button';
import { IconKakao, IconNaver } from '@repo/ui/Icon';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validator';
import type { LoginInputDataType } from '@/lib/validator';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInputDataType>({
    resolver: zodResolver(loginSchema),
  });

  const handleFormSubmit = async (data: LoginInputDataType) => {
    const isSuccess = await submitAction(data);

    if (isSuccess) {
      router.push('/');
      router.refresh();
    } else {
      setError('password', {
        message: '아이디 또는 비밀번호를 잘못 입력했습니다. 다시 확인해주세요.',
      });
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className='flex flex-col gap-3'>
        <Input
          type='text'
          placeholder='아이디을 입력해주세요. - testusername'
          errorMessage={errors.username?.message}
          {...register('username')}
        />
        <Input
          type='password'
          placeholder='비밀번호를 입력해주세요. - testtest@'
          errorMessage={errors.password?.message}
          {...register('password')}
        />
      </div>
      <div className='mb-5 mt-2 flex items-center justify-center gap-5'>
        <Link
          href={'/findpassword'}
          className='text-B2M14 text-text-secondary hover:underline'
        >
          비밀번호 찾기
        </Link>
        <Link
          href={'/signup/policy'}
          className='text-B2M14 text-text-secondary hover:underline'
        >
          회원가입
        </Link>
      </div>
      <BoxButton type='submit' size='large' style='solid'>
        로그인
      </BoxButton>
      <div className='my-3 flex items-center before:flex-1 before:border-t before:border-black/20 after:flex-1 after:border-t after:border-black/20 '>
        <p className='text-text-secondary mx-2 text-center text-sm'>또는</p>
      </div>
      <div className='flex flex-col gap-[13px]'>
        <BoxButton
          type='button'
          size='large'
          style='none'
          icon={<IconKakao />}
          className='bg-[#FFDE02]'
          onClick={() => toast.error('구글 로그인만 지원합니다.')}
        >
          Kakao 계정 로그인
        </BoxButton>
        <BoxButton
          type='button'
          size='large'
          style='none'
          icon={<IconNaver />}
          className='bg-[#03C75A] text-white'
          onClick={() => toast.error('구글 로그인만 지원합니다.')}
        >
          Naver 계정 로그인
        </BoxButton>
      </div>
    </form>
  );
}
