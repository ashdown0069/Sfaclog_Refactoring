import React from 'react';
import FooterTop from './components/FooterTop';
import FooterBottom from './FooterBottom';

function Footer() {
  return (
    <footer className='bg-neutral-90 flex flex-col items-center text-white'>
      <FooterTop />
      <div className='bg-neutral-70 h-[1px] w-full'></div>
      <FooterBottom />
    </footer>
  );
}

export default Footer;
