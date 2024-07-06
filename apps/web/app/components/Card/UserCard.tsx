import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import { CardTag } from './components/CardTag';
import type { IUser } from '@/models/User';
import Link from 'next/link';
interface UserCardProps {
  user: IUser;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className='shadow-custom flex h-[180px] w-[307px] flex-col bg-white p-5'>
      <Link href={`/user/${user.pageUrl}`} className='flex items-center gap-2'>
        <div>
          <Avatar size='m' type='user' />
        </div>
        <div className='text-B1B16'>{user.nickname}</div>
      </Link>
      <div className='mt-2 flex gap-2'>
        {user.interests.map(item => (
          <CardTag key={item} tag={item} />
        ))}
      </div>
      <div className='mt-6 text-B2M14 truncate'>{user.intro || ''}</div>
    </div>
  );
}
