'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { repeatChangePasswordEmail } from '../action';
import FindPasswordFormHeader from '../(components)/FindPasswordFormHeader';
import { BoxButton } from '@repo/ui/Button';
import Footer from '@/components/Footer/Footer';
import { LoadingSpinner } from '@/components/Spinner/LoadingSpinner';

function Verify() {
  const searchParams = useSearchParams();
  const emailAddress = searchParams.get('email');
  return (
    <main className='mx-auto flex min-h-[650px] w-[400px] flex-col justify-center pb-[85px] pt-[50px]'>
      <FindPasswordFormHeader
        title='비밀번호 찾기'
        description='비밀번호 재설정을 위한 이메일을 전송했습니다.'
        subDescription='메일함을 확인해 주세요.'
      />
      <BoxButton
        style='solid'
        type='button'
        size='large'
        onClick={async () => {
          if (emailAddress) {
            const result = await repeatChangePasswordEmail(emailAddress);
            if (result) alert('이메일이 재전송 되었습니다.');
            else alert('이메일 재전송에 실패 하였습니다');
          }
        }}
      >
        재전송하기
      </BoxButton>
      <div className='text-text-secondary text-B3R12 mt-2'>
        메일이 오지 않았다면, 스팸 메일함을 확인하거나 프로모션 메일함을 확인해
        주세요.
      </div>
    </main>
  );
}

export default function page() {
  return (
    <>
      <Suspense
        fallback={
          <div className='mx-auto my-20'>
            <LoadingSpinner />
          </div>
        }
      >
        <Verify />
      </Suspense>
      <Footer />
    </>
  );
}
