'use client';
import React, { useState } from 'react';
import { CapsuleButton } from '@repo/ui/Button';
import { IconCheckWhite, IconPlusBlue } from '@repo/ui/Icon';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
interface FollowButtonProps {
  size: 'small' | 'medium' | 'large';
  isfollowedUser: boolean;
  nickname: string;
}
export const FollowButton = ({
  size = 'large',
  isfollowedUser,
  nickname,
}: FollowButtonProps) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isfollowed, setIsfollowed] = useState(isfollowedUser);

  //팔로우, 언팔로우하기
  const handleFollow = async () => {
    if (isLoading) return;
    setIsLoading(() => true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/follow`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          nickname,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!res.ok) {
      toast.error('오류가 발생했습니다. 다시 시도해주세요');
    } else {
      setIsfollowed(prev => !prev);
    }
    toast.success(isfollowed ? '언팔로우 되었습니다' : '팔로우 되었습니다');
    setIsLoading(() => false);
    router.refresh();
  };
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isfollowed ? (
        isHovered ? (
          <CapsuleButton
            size={size}
            style='outline'
            type='button'
            className='text-B1M16 w-28'
            onClick={handleFollow}
            disabled={isLoading}
          >
            언팔로우
          </CapsuleButton>
        ) : (
          <CapsuleButton
            size={size}
            style='solid'
            type='button'
            icon={<IconCheckWhite className='size-4' />}
            className='text-B1M16 w-28'
            onClick={handleFollow}
            disabled={isLoading}
          >
            팔로잉
          </CapsuleButton>
        )
      ) : (
        <CapsuleButton
          size={size}
          style='outline'
          type='button'
          icon={<IconPlusBlue className='size-4' />}
          className='text-B1M16 hover:bg-brand-10 w-28'
          onClick={handleFollow}
          disabled={isLoading}
        >
          팔로우
        </CapsuleButton>
      )}
    </div>
  );
};
