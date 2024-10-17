import React from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import Link from 'next/link';
import { IUser } from '@/model/User';

export const ScrollableUserInfoTable = ({ users }: { users: IUser[] }) => {
  return (
    <div className='mt-3 w-full rounded-md border'>
      <div className='flex border-b p-3 text-center hover:bg-slate-50'>
        <div className='basis-1/5 text-center'>아바타</div>
        <div className='basis-1/5 text-center'>팔로잉 유저 닉네임</div>
      </div>
      <ScrollArea className='h-48'>
        {users.length === 0 && (
          <div className='flex items-center justify-center p-3'>
            유저 정보가 없습니다.
          </div>
        )}
        {users.length !== 0 &&
          users.map(user => (
            <div
              key={user._id}
              className='flex items-center border-b p-3 hover:bg-slate-50'
            >
              <div className='basis-1/5'>
                <Avatar className='mx-auto'>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>SF</AvatarFallback>
                </Avatar>
              </div>
              <div className='basis-1/5 text-center'>{user.nickname}</div>
              <div className='flex basis-3/5 items-center justify-end gap-2'>
                <Button asChild className='bg-brand-70 hover:bg-brand-90'>
                  <Link href={`/dashboard/users/${user._id}`}>유저 정보</Link>
                </Button>
                <Button asChild className='bg-brand-70 hover:bg-brand-90'>
                  <Link
                    target='_blank'
                    href={`${process.env.NEXT_PUBLIC_SFACLOG_URL}/user/${user.pageUrl}`}
                  >
                    스팩로그 유저 페이지
                  </Link>
                </Button>
              </div>
            </div>
          ))}
      </ScrollArea>
    </div>
  );
};
