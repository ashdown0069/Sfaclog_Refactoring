import { Login } from './components/Login';
import LoginFormHeader from './components/LoginFormHeader';
import Footer from '@/components/Footer/Footer';

export default function page() {
  return (
    <>
      <main className='mx-auto flex min-h-fit w-fit flex-col justify-center pb-[85px] pt-4'>
        <LoginFormHeader />
        <Login />
      </main>
      <Footer />
    </>
  );
}
