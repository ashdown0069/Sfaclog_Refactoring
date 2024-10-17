'use client';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/useSidebar';
import {
  ChevronLeft,
  FileText,
  LayoutDashboard,
  LogOut,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
const Sidebar = ({ className }: { className?: string }) => {
  const { isMinimized, toggle } = useSidebar();
  const pathname = usePathname();
  const handleToggle = () => {
    toggle();
  };
  return (
    <aside
      className={cn(
        `relative h-screen flex flex-col justify-between border-r bg-brand-5 transition-all duration-500`,
        !isMinimized ? 'w-72' : 'w-[72px]',
        className,
      )}
    >
      <div>
        <div className='w-fit p-5 pt-10'>
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>
            <Image src={'/icon.ico'} alt='logo' width={25} height={25} />
          </Link>
        </div>
        <div
          onClick={handleToggle}
          className={cn(
            'absolute -right-4 top-14 z-50 cursor-pointer rounded-full border bg-white',
            isMinimized && 'rotate-180',
          )}
        >
          <ChevronLeft size={30} color='#000000' strokeWidth={1.5} />
        </div>
        <div className='space-y-4 py-4'>
          <div className='px-3 py-2'>
            <div className='mt-3 space-y-3'>
              <Link
                href={'/dashboard'}
                className={cn(
                  'flex items-center gap-2 rounded-md hover:bg-brand-10 cursor-pointer py-2 px-1',
                  pathname === '/dashboard' && 'bg-brand-10',
                )}
              >
                <div className={'ml-2 shrink-0'}>
                  <LayoutDashboard
                    size={25}
                    color='#000000'
                    strokeWidth={1.5}
                  />
                </div>
                <p className={'overflow-hidden'}>DashBoard</p>
              </Link>
              <Link
                href={'/dashboard/users'}
                className={cn(
                  'flex items-center gap-2 rounded-md hover:bg-brand-10 cursor-pointer py-2 px-1',
                  pathname === '/dashboard/users' && 'bg-brand-10',
                )}
              >
                <div className={'ml-2 shrink-0'}>
                  <Users size={25} color='#000000' strokeWidth={1.5} />
                </div>
                <p className={'overflow-hidden'}>Users</p>
              </Link>
              <Link
                href={'/dashboard/logs'}
                className={cn(
                  'flex items-center gap-2 rounded-md hover:bg-brand-10 cursor-pointer py-2 px-1',
                  pathname === '/dashboard/logs' && 'bg-brand-10',
                )}
              >
                <div className={'ml-2 shrink-0'}>
                  <FileText size={25} />
                </div>
                <p className={'overflow-hidden'}>Logs</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='my-5 flex justify-center'>
        <Link
          href='/'
          className='border-brand-70 hover:bg-brand-5 flex h-9 w-3/4 items-center justify-center rounded-md border bg-white'
        >
          <div className='mr-2'>
            <LogOut size={20} color='#4c8aff' strokeWidth={1.5} />
          </div>
          {!isMinimized && (
            <p className='text-text-point overflow-hidden'>LogOut</p>
          )}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
