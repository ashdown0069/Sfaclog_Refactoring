'use client';
import { BoxButton } from '@repo/ui/Button';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CommentSchema } from '@/lib/validator';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import type { IComment } from '@/models/Comments';
import { IconReplyArrow } from '@repo/ui/Icon';
interface ReplyInputFormProps {
  placeholder: string;
  isLoggedIn: boolean;
  setCommentsState: React.Dispatch<React.SetStateAction<IComment[]>>;
  id: string;
  closeReplyInputForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReplyInputForm = ({
  placeholder,
  isLoggedIn,
  setCommentsState,
  id,
  closeReplyInputForm,
}: ReplyInputFormProps) => {
  const params = useParams();
  const router = useRouter();
  const [replyCommentValue, setReplyCommentValue] = useState('');
  const handleTextareaClick = () => {
    //로그인이 안되어있을 때
    if (
      !isLoggedIn &&
      confirm('로그인이 필요합니다. 로그인 페이지로 이동 하시겠습니까?')
    ) {
      router.push('/login');
    } else {
      return;
    }
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //로그인이 안되어있을 때
    if (!isLoggedIn) {
      setReplyCommentValue(() => '');
      return;
    }
    setReplyCommentValue(() => e.target.value);
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //로그인이 안되어있을 때
    if (
      !isLoggedIn &&
      confirm('로그인이 필요합니다. 로그인 페이지로 이동 하시겠습니까?')
    ) {
      router.push('/login');
    } else if (isLoggedIn) {
      //로그인했을 경우 댓글 등록
      const result = CommentSchema.safeParse(replyCommentValue);

      //빈 문자열을 등록할 경우
      if (!result.success) {
        toast.error('답글을 입력해주세요.');
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/comments/reply`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reply: result.data,
            logId: params.id,
            commentId: id,
          }),
        },
      );

      if (!res.ok) {
        toast.error('댓글 등록에 실패했습니다.');
        return;
      }
      const data = await res.json();

      //댓글 등록 성공, 클라이언트상에서 댓글 새로고침
      setCommentsState(() => [...data.comments]);

      //답글 입력창 초기화
      setReplyCommentValue(() => '');
      //답글 입력창 닫기
      closeReplyInputForm(() => false);
    }
  };
  return (
    <form className='flex gap-3 px-6 py-1' onSubmit={handleCommentSubmit}>
      <div className='p-1'>
        <IconReplyArrow />
      </div>
      <textarea
        value={replyCommentValue}
        onChange={handleTextareaChange}
        onClick={handleTextareaClick}
        className='placeholder:text-B2R14 placeholder:text-neutral-40 h-[40px] w-full min-w-[460px] overflow-hidden rounded-md border px-4 py-2 outline-none'
        placeholder={placeholder}
      />
      <div className='flex items-center justify-end'>
        <BoxButton type='submit' size='small' style='outline'>
          답글 등록
        </BoxButton>
      </div>
    </form>
  );
};
