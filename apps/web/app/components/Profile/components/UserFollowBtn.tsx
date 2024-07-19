'use client';
import { CapsuleButton } from '@repo/ui/Button';
import { IconPlusWhite, IconCancelWhite } from '@repo/ui/Icon';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
interface UserFollowBtnProps {
  isFollowing: boolean;
  nickname: string;
  isLoggedIn: boolean;
}

export const UserFollowBtn = ({
  isFollowing,
  nickname,
  isLoggedIn,
}: UserFollowBtnProps) => {
  const router = useRouter();
  //팔로잉 하고있으면 언팔로우 할건지
  //팔로잉하고 있지 않다면 팔로우 할건지
  const [isFollowingState, setIsFollowingState] =
    useState<boolean>(isFollowing);
  const [isLoading, setIsLoading] = useState(false);
  const handleFollowBtnClick = async () => {
    if (isLoading) return;
    if (!isLoggedIn) {
      const result = confirm(
        '로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?',
      );
      if (result) {
        router.push('/login');
      }

      return;
    }

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
      alert('오류 - 팔로우/언팔로우에 실패했습니다.');
      router.refresh();
    } else {
      setIsFollowingState(prev => !prev);
    }
    setIsLoading(() => false);
  };
  return (
    <>
      <CapsuleButton
        size='large'
        style='solid'
        type='button'
        icon={
          isFollowingState ? (
            <IconCancelWhite className='size-4' />
          ) : (
            <IconPlusWhite className='size-4' />
          )
        }
        onClick={handleFollowBtnClick}
      >
        {isFollowingState ? '언팔로우' : '팔로우'}
      </CapsuleButton>
    </>
  );
};
