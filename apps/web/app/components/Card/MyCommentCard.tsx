'use client';
import React, { useState } from 'react';
import { MyCommentCardContainer } from './components/CardContainers';
import { IconCancelBlack, IconReplyArrow } from '@repo/ui/Icon';
import type { ICommentandReply } from '@/(routes)/mypage/components/myComments/MyComments';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
interface MyCommentCardProps {
  comment: ICommentandReply;
}
export const MyCommentCard = ({ comment }: MyCommentCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleDeleteComment = async () => {
    if (isLoading) return;
    if (confirm('정말 삭제하시겠습니까?')) {
      setIsLoading(() => true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/comments/${comment._id}`,
        { method: 'DELETE' },
      );
      if (!res.ok) {
        toast.error('삭제에 실패했습니다.');
      } else {
        toast.success('삭제되었습니다.');
      }
      setIsLoading(() => false);
      router.refresh();
    }
  };

  return (
    <MyCommentCardContainer>
      <div className='flex h-fit justify-between px-6 py-4'>
        <div className='flex flex-col justify-center gap-1'>
          <div className='text-H3M18 text-text-primary truncate'>
            {comment.content}
          </div>
          <div className='text-B3R12 text-text-secondary'>
            {comment.createdAt?.slice(0, 10)}
          </div>
        </div>
        <button
          onClick={handleDeleteComment}
          className='flex items-center justify-end'
        >
          <IconCancelBlack className='size-5' />
        </button>
      </div>
      <Link
        href={`/log/${comment.log._id}`}
        className='bg-tag-tag text-text-primary flex h-12 items-center gap-3 px-8'
      >
        <IconReplyArrow />
        <span className='text-B2M14 pt-1'>
          <span className='text-text-point pr-2'>[제목]</span>
          {comment.log.title}
        </span>
      </Link>
    </MyCommentCardContainer>
  );
};
