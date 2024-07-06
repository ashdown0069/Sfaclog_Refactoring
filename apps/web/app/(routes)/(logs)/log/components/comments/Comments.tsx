//@ts-nocheck
'use client';
import { CommentInputForm } from './CommentInputForm';
import { CommentItem } from './CommentItem';
import { useState } from 'react';
import type { IComment, IReplyComment } from '@/models/Comments';
import type { IUser } from '@/models/User';
import type { Types } from 'mongoose';
import { ReplyInputForm } from './ReplyInputForm';
import { ReplyItem } from './ReplyItem';

interface CommentsProps {
  isLoggedIn: boolean;
  comments: IComment[];
}
export const Comments = ({ isLoggedIn, comments }: CommentsProps) => {
  const [commentsState, setCommentsState] = useState<IComment[]>(comments);
  const placeholder = isLoggedIn
    ? '댓글을 입력해주세요'
    : '로그인 후 댓글을 입력해주세요';

  return (
    <div>
      <CommentInputForm
        setCommentsState={setCommentsState}
        placeholder={placeholder}
        isLoggedIn={isLoggedIn}
      />
      {commentsState.map((comment: IComment) => {
        return (
          <div key={comment._id}>
            <CommentItem
              id={comment._id ? comment._id : ''}
              nickname={comment.author.nickname}
              avatar={comment.author.avatar}
              content={comment.content}
              createdAt={comment.createdAt as string}
              isLoggedIn={isLoggedIn}
              setCommentsState={setCommentsState}
            />
            {comment.replies &&
              comment.replies.length > 0 &&
              comment.replies.map((reply: IReplyComment) => {
                return (
                  <ReplyItem
                    key={reply._id}
                    avatar={reply.author.avatar}
                    content={reply.content}
                    createdAt={reply.createdAt as string}
                    nickname={reply.author.nickname}
                  />
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

//for typescheck
export function isUser(
  author:
    | Pick<IUser, 'nickname' | 'avatar' | 'createdAt' | '_id'>
    | Types.ObjectId,
): author is Pick<IUser, 'nickname' | 'avatar' | 'createdAt' | '_id'> {
  return (
    (author as Pick<IUser, 'nickname' | 'avatar' | 'createdAt' | '_id'>)
      .nickname !== undefined
  );
}
