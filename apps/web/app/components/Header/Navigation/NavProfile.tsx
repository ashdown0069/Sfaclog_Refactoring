'use client';
import Link from 'next/link';
import { Avatar } from '@/components/Avatar/Avatar';
import { LogoutAction } from './action';

interface NavProfileProps {
  avatar?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function NavProfile({ avatar, isOpen, onToggle }: NavProfileProps) {
  return (
    <div className='relative' title='프로필'>
      <div onClick={onToggle} className='cursor-pointer'>
        <Avatar size='s' url={avatar} />
      </div>
      {isOpen && (
        <div className='shadow-custom absolute right-0 z-40 mt-3 flex max-h-60 w-max flex-col overflow-auto rounded-md bg-white p-2 text-base focus:outline-none sm:text-sm'>
          <Link
            href='/mypage'
            onClick={onToggle}
            className={`text-B1R16 hover:bg-brand-10 hover:text-brand-100 relative cursor-pointer select-none rounded-md p-3 text-center`}
          >
            마이페이지
          </Link>
          <form action={LogoutAction} className='w-full'>
            <button
              type='submit'
              className={`text-B1R16 hover:bg-brand-10 hover:text-brand-100 relative w-full cursor-pointer select-none rounded-md p-3 text-center`}
            >
              로그아웃
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
