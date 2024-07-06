import React from 'react';
import { HeaderTabs } from './HeaderTabs';
import { Navigation } from './Navigation/Navigation';
import { Toaster } from 'react-hot-toast';
export function Header() {
  return (
    <header className='h-fit w-full'>
      <Toaster position='top-center' reverseOrder={true} />
      <div className='bg-neutral-5 relative h-[46px]'>
        <div className='headerTab'>
          <div className='mx-auto h-full w-[1440px] px-[184px]'>
            <HeaderTabs />
          </div>
        </div>
      </div>
      <div className='relative h-[64px] bg-white'>
        <div className='mx-auto max-w-[960px]'>
          <Navigation />
        </div>
      </div>
    </header>
  );
}
