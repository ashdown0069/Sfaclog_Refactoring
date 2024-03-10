import { NotFoundImg } from '@public/svgs';
import React from 'react';
import { LinkToMainPageBtn } from '@/components/UniqueBtn/LinkToMainPageBtn';

function NotFound() {
  return (
    <>
      <div className='h-screen w-full bg-white'>
        <div className='flex h-3/4 items-center justify-center gap-20'>
          <NotFoundImg />
          <div>
            <div className='text-text-primary mb-11 flex flex-col gap-3'>
              <p className='text-H3B18'>요청하신 페이지를 찾을 수 없습니다.</p>
              <p className='text-B2R14 text-text-secondary'>
                원하는 페이지의 결과를 찾을 수 없습니다. <br />
                입력하신 페이지의 주소가 정확한지 확인해주세요.
              </p>
            </div>
            <LinkToMainPageBtn />
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
