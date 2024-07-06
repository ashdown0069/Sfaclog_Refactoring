import { signIn } from '@/auth/auth';
import { BoxButton } from '@repo/ui/Button';
import { IconGoogle } from '@repo/ui/Icon';
import React from 'react';
export const GoogleLoginBtn = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', { redirectTo: '/' });
      }}
    >
      <BoxButton
        type='submit'
        size='large'
        style='none'
        icon={<IconGoogle />}
        className='w-full border'
      >
        Google 계정 로그인
      </BoxButton>
    </form>
  );
};
