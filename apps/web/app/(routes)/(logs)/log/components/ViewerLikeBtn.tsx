import { IconHeartBlack, IconHeartBlue } from '@repo/ui/Icon';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleLogLike } from './action';
import toast from 'react-hot-toast';
interface ViewerLikeBtnProps {
  logId: string;
  isLoggedIn: boolean;
  isLikedUser: boolean;
  logLikes: number;
  isLogOwner: boolean;
}

export const ViewerLikeBtn = ({
  logId,
  isLoggedIn,
  isLikedUser,
  logLikes,
  isLogOwner,
}: ViewerLikeBtnProps) => {
  const [isClickLike, setIsClickLike] = useState(isLikedUser);
  const [isLoading, setIsLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(logLikes);
  const router = useRouter();
  const handleLikeBtn = async () => {
    if (isLogOwner) return;
    if (isLoading) return;
    setIsLoading(() => true);

    //로그인이 안되어있을 때
    if (
      !isLoggedIn &&
      confirm('로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?')
    ) {
      router.push('/login');
    }

    const result = await handleLogLike(logId);
    if (!result) {
      toast.error('좋아요 처리에 실패했습니다.');
    }

    setLikesCount(() => (isClickLike ? likesCount - 1 : likesCount + 1));
    setIsClickLike(() => !isClickLike);
    setIsLoading(() => false);
  };
  return (
    <div
      onClick={handleLikeBtn}
      className='border-neutral-20 flex cursor-pointer items-center gap-1 rounded-full border px-5 py-3'
    >
      <span className='size-6'>
        {isClickLike ? <IconHeartBlue /> : <IconHeartBlack />}
      </span>
      <span className='text-B2M14 text-neutral-70'>{likesCount}</span>
    </div>
  );
};
