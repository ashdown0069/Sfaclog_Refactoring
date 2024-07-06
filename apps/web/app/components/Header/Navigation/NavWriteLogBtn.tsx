'use client';
import { CapsuleButton } from '@repo/ui/Button';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
export const NavWriteLogBtn = ({ isLoggedin }: { isLoggedin: boolean }) => {
  const router = useRouter();
  const handleWriteLogBtnClick = () => {
    //로그인 상태가 아닐 때 경고창 -> 로그인 페이지로 이동
    if (!isLoggedin) {
      alert('로그인 후 이용해주세요');
      router.push('/login');
    }
  };
  return (
    <CapsuleButton
      size='large'
      style='solid'
      type='button'
      onClick={handleWriteLogBtnClick}
    >
      <Link href={'/write'}>글쓰기</Link>
    </CapsuleButton>
  );
};
