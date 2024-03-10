import React from 'react';
import { SfaclogLogoFooter } from '@repo/ui/Icon';
import FooterInfo from './components/FooterInfo';
import FooterCustomService from './components/FooterCustomService';

function FooterBottom() {
  return (
    <div className='container flex justify-between py-8'>
      <div className='flex gap-[42px]'>
        <SfaclogLogoFooter className='shrink-0' />
        <FooterInfo />
      </div>
      <FooterCustomService />
    </div>
  );
}

export default FooterBottom;
