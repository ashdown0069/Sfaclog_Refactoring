import { MyCommentCard } from '@/components/Card/MyCommentCard';
import { IComment } from '@/models/Comments';

import React from 'react';
import { MypageNotFound } from '../MypageNotFound';
export interface ICommentandReply extends IComment {
  logId: string;
  title: string;
}
interface myCommentsProps {
  commentsAndReplies: ICommentandReply[];
}
export const MyComments = ({ commentsAndReplies }: myCommentsProps) => {
  return (
    <section className='size-full'>
      {commentsAndReplies.length > 0 && (
        <ul className='flex w-full flex-col items-center gap-3'>
          {commentsAndReplies.map((comment: ICommentandReply) => (
            <li key={comment._id} className='w-full'>
              <MyCommentCard comment={comment} />
            </li>
          ))}
        </ul>
      )}
      {commentsAndReplies.length === 0 && (
        <div className='flex size-full items-center justify-center'>
          <MypageNotFound
            title='아직 작성한 댓글이 없어요.'
            description='로그에서 댓글을 남겨보세요'
          />
        </div>
      )}
    </section>
  );
};
