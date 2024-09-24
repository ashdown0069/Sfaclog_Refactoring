import { CapsuleButton } from '@repo/ui/Button';
import Link from 'next/link';
import React from 'react';

const NavGuestBtn = () => {
  return (
    <div className='flex w-[171px] grow items-center gap-2'>
      <CapsuleButton style='outline' size='small'>
        <Link href={'/login'}>로그인</Link>
      </CapsuleButton>
      <CapsuleButton style='solid' size='small'>
        <Link href={'/signup/policy'}>회원가입</Link>
      </CapsuleButton>
    </div>
  );
};

export default NavGuestBtn;
