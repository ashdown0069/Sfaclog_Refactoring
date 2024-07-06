'use client';
import { Avatar } from '@/components/Avatar/Avatar';
import { formatDateCommentItem } from '@/utils/formatUtils';
import { useState } from 'react';
import { ReplyInputForm } from './ReplyInputForm';
import type { IComment } from '@/models/Comments';
interface CommentItemProps {
  nickname: string;
  avatar: string;
  createdAt: string;
  content: string;
  setCommentsState: React.Dispatch<React.SetStateAction<IComment[]>>;
  isLoggedIn: boolean;
  id: string;
}
export const CommentItem = ({
  avatar,
  content,
  createdAt,
  nickname,
  setCommentsState,
  isLoggedIn,
  id,
}: CommentItemProps) => {
  const [isOpenReply, setIsOpenReply] = useState(false);
  return (
    <>
      <div className='h-28 w-full border-b bg-white p-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Avatar size='s' type='user' url={avatar ? avatar : undefined} />
            <span className='text-B2B14'>{nickname}</span>
            <span className='text-text-gray text-B3R12'>
              {formatDateCommentItem(createdAt)}
            </span>
          </div>
          <button
            onClick={() => setIsOpenReply(prev => !prev)}
            className='text-B3R12 text-text-gray'
          >
            답글달기
          </button>
        </div>
        <div className='text-B2R14 text-text-primary p-3'>{content}</div>
      </div>
      {isOpenReply && (
        <ReplyInputForm
          placeholder={
            isLoggedIn ? '답글을 입력해주세요' : '로그인 후 답글을 입력해주세요'
          }
          isLoggedIn={isLoggedIn}
          setCommentsState={setCommentsState}
          id={id}
          closeReplyInputForm={setIsOpenReply}
        />
      )}
    </>
  );
};
