import React from 'react';
import { SfaclogLogo } from '@repo/ui/Icon';
import Link from 'next/link';
export function HeaderTabs() {
  return (
    <div className={'relative flex items-center justify-center'}>
      <Link href={'/'}>
        <div className='absolute left-0 mt-[6px] inline-flex h-[40px] w-[120px] cursor-pointer items-center justify-center rounded-t-md bg-white p-[10px] outline-none duration-300 ease-in-out'>
          <SfaclogLogo className='fill-brand-100 ui-not-selected:fill-neutral-40 h-[13px] w-[79px] duration-300 ease-in-out' />
        </div>
      </Link>
      <a href={process.env.HEADER_TAB_URL} target='_blank'>
        <div className='absolute left-32 mt-[6px] inline-flex h-[40px] w-[120px] cursor-pointer items-center justify-center rounded-t-md bg-white p-[10px] outline-none'>
          <span className='text-B2B14'>STORY BOOK</span>
        </div>
      </a>
      <a href={process.env.HEADER_TAB_URL2} target='_blank'>
        <div className='absolute left-64 mt-[6px] inline-flex h-[40px] w-[120px] cursor-pointer items-center justify-center rounded-t-md bg-white p-[10px] outline-none'>
          <span className='text-B2B14'>Dashboard</span>
        </div>
      </a>
    </div>
  );
}
