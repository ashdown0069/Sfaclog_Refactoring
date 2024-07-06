'use client';
import { BoxButton } from '@repo/ui/Button';
import { IconNaver } from '@repo/ui/Icon';
import React from 'react';
import toast from 'react-hot-toast';

export const NaverLoginBtn = () => {
  return (
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
  );
};
