'use client';
import { formatNumber } from '@/utils/formatUtils';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
interface FollowToggleProps {
  followingCount: number;
  followerCount: number;
}
export const FollowToggle = ({
  followerCount = 0,
  followingCount = 0,
}: FollowToggleProps) => {
  //searchParams에 따라 색상 변경
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'following';
  return (
    <div className='flex gap-5 p-2'>
      <Link
        href={`/mypage/follow?filter=following`}
        className={`text-B1M16
          ${filter == 'following' ? `text-text-point` : 'text-text-primary'}
        `}
      >
        팔로잉 {formatNumber(followingCount)}
      </Link>
      <Link
        href={`/mypage/follow?filter=follower`}
        className={`text-B1M16
      ${filter == 'follower' ? `text-text-point` : 'text-text-primary'}
    `}
      >
        팔로워 {formatNumber(followerCount)}
      </Link>
    </div>
  );
};
