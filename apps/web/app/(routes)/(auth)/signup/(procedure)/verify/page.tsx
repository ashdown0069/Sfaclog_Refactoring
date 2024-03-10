import { CompleteImg } from '@public/svgs';
import Footer from '@/components/Footer/Footer';
import { notFound } from 'next/navigation';
import { CheckDuplication } from '../signupform/action';
import { ResendBtn } from './ResendBtn';

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  console.log('email = ', searchParams.email);
  if (searchParams.email !== undefined) {
    const { isDuplicate, error } = await CheckDuplication(
      'email',
      searchParams.email,
    );
    //db에 없는 이메일이라면 404페이지로 보내기
    if (!isDuplicate) {
      return notFound();
    } else if (error) {
      //에러가 발생했다면 404페이지로 보내기
      return notFound();
    }
  }

  return (
    <>
      <section className='mx-auto my-16 flex flex-col items-center justify-center'>
        <div>
          <CompleteImg />
        </div>
        <div className='text-H0M32 text-neutral-70 mb-6 mt-2'>
          이메일 전송 완료
        </div>
        <div className='text-B2R14 text-text-primary mb-10 text-center'>
          <div>작성하신 메일주소로 인증요청을 보냈습니다.</div>
          <div>메일함을 확인해 주세요.</div>
        </div>
        <div>
          {searchParams.email && (
            <ResendBtn emailAddress={searchParams.email} />
          )}
          <div className='text-text-secondary text-B3R12 mt-2'>
            메일이 오지 않았다면, 스팸 메일함을 확인하거나 프로모션 메일함을
            확인해 주세요.
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
