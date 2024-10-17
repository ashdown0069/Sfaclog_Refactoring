'use client';
import type { IComment } from '@/model/Comments';
import { ScrollArea } from '../ui/scroll-area';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

export const UserComment = ({
  comments,
  showLinkToPageBtn = true,
  showUserInfoBtn = true,
}: {
  comments: IComment[];
  showLinkToPageBtn: boolean;
  showUserInfoBtn: boolean;
}) => {
  return (
    <div className='mt-3 w-full rounded-md border'>
      <div className='flex p-3 hover:bg-slate-50'>
        <div className='text-text-secondary basis-1/5 text-center'>유저</div>
        <div className='text-text-secondary basis-1/5 text-center'>
          댓글 내용
        </div>
        <div className='text-text-secondary basis-1/5 text-center'>작성일</div>
      </div>
      <ScrollArea className='h-48'>
        {comments.length === 0 && (
          <div className='flex items-center justify-center border-t p-3'>
            댓글이 없습니다
          </div>
        )}
        {comments.length > 0 &&
          comments.map(comment => (
            <div
              key={comment._id}
              className='flex items-center border p-3 hover:bg-slate-50'
            >
              <div className='basis-1/5 text-center'>
                {comment.author.nickname}
              </div>
              <div className='basis-1/5 text-center'>{comment.content}</div>
              <div className='basis-1/5 text-center'>
                {comment.createdAt?.slice(0, 10)}
              </div>
              <div className='flex grow items-center justify-end gap-2'>
                {showUserInfoBtn && (
                  <Button asChild className='bg-brand-70 hover:bg-brand-90'>
                    <Link
                      target='_blank'
                      href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/users/${comment.author._id}`}
                    >
                      유저 정보
                    </Link>
                  </Button>
                )}
              </div>
              {showLinkToPageBtn && (
                <div className='flex grow items-center justify-end gap-2'>
                  <Button asChild className='bg-brand-70 hover:bg-brand-90'>
                    <Link
                      target='_blank'
                      href={`${process.env.NEXT_PUBLIC_SFACLOG_URL}/log/${comment.log}`}
                    >
                      스팩로그 페이지에서 보기
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          ))}
      </ScrollArea>
    </div>
  );
};
