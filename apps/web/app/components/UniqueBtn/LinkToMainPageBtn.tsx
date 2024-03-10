import Link from 'next/link';
export function LinkToMainPageBtn() {
  return (
    <Link
      className='bg-brand-70 text-B2M14 flex h-10 w-[200px] items-center justify-center rounded-md text-white'
      href='/'
    >
      메인 페이지로 돌아가기
    </Link>
  );
}
