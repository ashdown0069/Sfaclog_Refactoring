import type { IUser } from '@/models/User';
import { Avatar } from '../Avatar/Avatar';

interface FollowCardProps {
  user: IUser;
}

export const FollowCard = ({ user }: FollowCardProps) => {
  return (
    <div className='flex gap-3 p-1'>
      <Avatar size='m' url={user.avatar} />
      <div className='flex flex-col justify-center gap-1.5'>
        <div className='text-B1M16 text-neutral-90'>{user.nickname}</div>
        {user.intro && (
          <p className='text-B2R14 text-neutral-70'>{user.intro}</p>
        )}
      </div>
    </div>
  );
};
