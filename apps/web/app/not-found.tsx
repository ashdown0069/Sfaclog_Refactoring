import { NotFoundImg } from '@public/svgs';
import Link from 'next/link';

function NotFound() {
  return (
    <div className='h-screen w-full bg-[#2F364D]'>
      <div className='flex h-full items-center justify-center gap-20'>
        <NotFoundImg />

        <div>
          <div className='mb-11 flex flex-col gap-3 text-white'>
            <p className='text-[100px] font-medium'>404</p>
            <p className='text-H3B18'>요청하신 페이지를 찾을 수 없습니다.</p>
            <p className='text-B2R14 text-neutral-20'>
              원하는 페이지의 결과를 찾을 수 없습니다. <br />
              입력하신 페이지의 주소가 정확한지 확인해주세요.
            </p>
          </div>
          <Link
            className='bg-brand-70 text-B2M14 flex h-10 w-[200px] items-center justify-center rounded-md text-white'
            href='/'
          >
            메인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
