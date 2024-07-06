import Image from 'next/image';
import React from 'react';

export const FullLoadingSpinner = () => {
  return (
    <div className='fixed inset-0 z-[100] flex h-screen w-full flex-col items-center justify-center backdrop-brightness-50'>
      <Image
        src='/svgs/LogoFooter.svg'
        width={72}
        height={51}
        className='absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2'
        alt='loading'
      />
      <div className='border-t-brand-90 absolute size-44 animate-spin rounded-full border-8' />
    </div>
  );
};
