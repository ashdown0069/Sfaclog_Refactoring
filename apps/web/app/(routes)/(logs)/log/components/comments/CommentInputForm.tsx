'use client';
import { BoxButton } from '@repo/ui/Button';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CommentSchema } from '@/lib/validator';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import type { IComment } from '@/models/Comments';
interface CommentInputFormProps {
  placeholder: string;
  isLoggedIn: boolean;
  setCommentsState: React.Dispatch<React.SetStateAction<IComment[]>>;
}

export const CommentInputForm = ({
  placeholder,
  isLoggedIn,
  setCommentsState,
}: CommentInputFormProps) => {
  const params = useParams();
  const router = useRouter();
  const [commentValue, setCommentValue] = useState('');
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
      setCommentValue(() => '');
      return;
    }
    setCommentValue(() => e.target.value);
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
      const result = CommentSchema.safeParse(commentValue);

      //빈 문자열을 등록할 경우
      if (!result.success) {
        toast.error('댓글을 입력해주세요.');
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/comments`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ comment: result.data, logId: params.id }),
        },
      );

      if (!res.ok) {
        toast.error('댓글 등록에 실패했습니다.');
        return;
      }
      const data = await res.json();

      //댓글 등록 성공, 클라이언트상에서 댓글 새로고침
      setCommentsState(() => [...data.comments]);
      setCommentValue(() => '');
    }
  };
  return (
    <form className='flex flex-col gap-3' onSubmit={handleCommentSubmit}>
      <textarea
        value={commentValue}
        onChange={handleTextareaChange}
        onClick={handleTextareaClick}
        className='placeholder:text-B2R14  placeholder:text-neutral-40 h-[80px] min-w-[460px] resize-none rounded-md border px-4 py-2 outline-none '
        placeholder={placeholder}
      />
      <div className='flex items-center justify-end'>
        <BoxButton type='submit' size='small' style='outline'>
          댓글 등록
        </BoxButton>
      </div>
    </form>
  );
};
