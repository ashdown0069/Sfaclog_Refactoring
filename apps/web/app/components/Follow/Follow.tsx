import { FollowCard } from '@/components/Card/FollowCard';
import { FollowToggle } from '@/components/Follow/FollowToggle';
import { FollowButton } from '@/components/UniqueBtn/FollowButton';
import type { IUser } from '@/models/User';
import { MypageNotFound } from '../../(routes)/mypage/components/MypageNotFound';
import { Fragment } from 'react';
interface IUserFollowStatus extends IUser {
  //백엔드에서 추가되어 넘어옴
  isFollowedUser: boolean;
}
interface FollowProps {
  users: IUserFollowStatus[];
  followingCount: number;
  followerCount: number;
  filter: string; //searchparam
}
export const Follow = ({
  users = [],
  followerCount,
  followingCount,
  filter,
}: FollowProps) => {
  const notFoundTitle =
    filter === 'following'
      ? '아직 아무도 팔로잉하지 않았어요'
      : '아직 아무도 회원님을 팔로우 하지 않았어요';

  return (
    <div className='my-10 w-full'>
      <div className='mb-5 flex items-center justify-center'>
        <FollowToggle
          followerCount={followerCount}
          followingCount={followingCount}
        />
      </div>
      <div className='flex size-full flex-col'>
        {users.length > 0 &&
          users.map((user, idx) => (
            <Fragment key={idx}>
              <div className='my-3 border-t' />
              <div className='flex items-center justify-between'>
                <FollowCard user={user} />
                <FollowButton
                  size='large'
                  isfollowedUser={user.isFollowedUser}
                  nickname={user.nickname}
                />
              </div>
            </Fragment>
          ))}
        {users.length === 0 && (
          <div className='mt-10 flex size-full items-center justify-center'>
            <MypageNotFound title={notFoundTitle} />
          </div>
        )}
      </div>
    </div>
  );
};
