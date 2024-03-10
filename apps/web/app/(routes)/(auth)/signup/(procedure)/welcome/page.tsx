import Link from 'next/link';
import { WelcomeImg } from '@public/svgs';
import { BoxButton } from '@repo/ui/Button';
import Footer from '@/components/Footer/Footer';

export default function page() {
  return (
    <>
      <section className='mx-auto my-16 flex flex-col items-center gap-6'>
        <div>
          <WelcomeImg />
        </div>
        <div className='text-text-primary text-H0M32'>
          스팩로그에 오신 걸 환영합니다
        </div>
        <div className='text-neutral-70 text-B1R16'>
          지금 바로 다양한 로그를 감상해 보세요!
        </div>
        <div>
          <BoxButton type='button' size='large' style='solid'>
            <Link href={'/login'}>로그인</Link>
          </BoxButton>
        </div>
      </section>

      <Footer />
    </>
  );
}
