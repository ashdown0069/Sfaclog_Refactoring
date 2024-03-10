'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
export default function layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {pathname.startsWith('/signup/verify') ||
      pathname.startsWith('/signup/welcome') ? null : (
        <div className='text-H0M32 text-text-primary mb-10 mt-4 text-center'>
          회원가입
        </div>
      )}
      {children}
    </>
  );
}
