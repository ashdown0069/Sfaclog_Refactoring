import { notFound } from 'next/navigation';
import FindPasswordFormHeader from '../(components)/FindPasswordFormHeader';
import { ResetPasswordForm } from '../(components)/ResetPasswordForm';
import Footer from '@/components/Footer/Footer';

export default function page({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  //토큰이 없을 경우 404페이지로 이동
  if (!searchParams.token) return notFound();
  return (
    <>
      <main className='mx-auto flex min-h-[650px] w-[400px] flex-col justify-center pb-[85px] pt-[50px]'>
        <FindPasswordFormHeader
          title='비밀번호 변경하기'
          description='새로운 비밀번호를 입력해 주세요.'
        />
        <ResetPasswordForm token={searchParams.token} />
      </main>

      <Footer />
    </>
  );
}
