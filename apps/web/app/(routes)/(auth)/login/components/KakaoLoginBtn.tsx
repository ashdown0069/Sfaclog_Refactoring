'use client';
import { BoxButton } from '@repo/ui/Button';
import { IconKakao } from '@repo/ui/Icon';
import React from 'react';
import toast from 'react-hot-toast';

export const KakaoLoginBtn = () => {
  return (
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
  );
};
