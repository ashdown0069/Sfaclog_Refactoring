'use client';

import React from 'react';
import { IconShare } from '@repo/ui/Icon';
import toast from 'react-hot-toast';
export const ViewerShareBtn = () => {
  const onShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('주소가 복사되었습니다!');
  };
  return (
    <>
      <IconShare className='cursor-pointer' onClick={onShare} />
    </>
  );
};
