import Link from 'next/link';
import { Bell, LogOut, User } from 'lucide-react';
import { LogoutAction } from '../action';

export function NavAuthBtn({
  unReadNotifications,
}: {
  unReadNotifications: number;
}) {
  return (
    <div className='flex items-center gap-5'>
      <div className='cursor-pointer flex items-center'>
        <Link
          title='알람'
          href='/mypage'
          className={`flex items-center gap-1 text-B1R16 hover:bg-brand-10 hover:text-brand-100 relative w-full cursor-pointer select-none rounded-md p-3 text-center`}
        >
          <Bell strokeWidth={1.5} />
          {unReadNotifications !== 0 && (
            <div className='absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 z-10'>
              {unReadNotifications}
            </div>
          )}
        </Link>
        <Link
          title='마이페이지'
          href='/mypage'
          className={`flex items-center gap-1 text-B1R16 hover:bg-brand-10 hover:text-brand-100 relative w-full cursor-pointer select-none rounded-md p-3 text-center`}
        >
          <User strokeWidth={1.5} />
        </Link>
        <form action={LogoutAction} className='w-full' title='로그아웃'>
          <button
            type='submit'
            className={`flex items-center gap-1 text-B1R16 hover:bg-brand-10 hover:text-brand-100 relative w-full cursor-pointer select-none rounded-md p-3 text-center`}
          >
            <LogOut strokeWidth={1.5} />
          </button>
        </form>
      </div>
    </div>
  );
}
