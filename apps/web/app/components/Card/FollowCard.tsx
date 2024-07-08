import type { IUser } from '@/models/User';
import { Avatar } from '../Avatar/Avatar';
import Link from 'next/link';

interface FollowCardProps {
  user: IUser;
}

export const FollowCard = ({ user }: FollowCardProps) => {
  return (
    <Link href={`/user/${user.pageUrl}`} className='flex gap-3 p-1'>
      <Avatar size='m' url={user.avatar || undefined} />
      <div className='flex flex-col justify-center gap-1.5'>
        <div className='text-B1M16 text-neutral-90'>{user.nickname}</div>
        {user.intro && (
          <p className='text-B2R14 text-neutral-70'>{user.intro}</p>
        )}
      </div>
    </Link>
  );
};
