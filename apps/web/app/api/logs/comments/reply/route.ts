import { auth } from '@/auth/auth';
import { NextRequest, NextResponse } from 'next/server';
import { LogModel } from '@/models/Log';
import { revalidateTag } from 'next/cache';
import { Types } from 'mongoose';
import { CommentSchema } from '@/lib/validator';
import { connectDB } from '@/lib/db';
import { CommentsModel } from '@/models/Comments';

/**
 * Client Side: POST /api/logs/comments/reply
 * @description 댓글의 답글을 추가하는 API
 * @description 로그인 필요
 * @param commentId comments 배열의 개별 _id
 * @param logId 로그의 _id
 * @param reply 답글 내용
 * @returns IComment[] 댓글 목록 리턴
 */
export const POST = auth(async (req: NextRequest) => {
  if (!req.auth) {
    return NextResponse.json(
      { success: false, message: 'unauthorized - not logged in' },
      { status: 401 },
    );
  }

  try {
    await connectDB();
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: 'can not connect to database',
      },
      { status: 500 },
    );
  }

  const data = await req.json();
  const { userId } = req.auth.user;
  try {
    if (!data.reply || !data.logId || !data.commentId) {
      throw new Error('reply content or logId or commentId is missing');
    }
    const parsedContent = CommentSchema.parse(data.reply);
    const foundComment = await CommentsModel.findById(data.commentId).exec();

    if (!foundComment) {
      throw new Error('Comment not found');
    }

    if (foundComment && foundComment.replies) {
      foundComment.replies.push({
        author: new Types.ObjectId(userId),
        content: parsedContent,
      });
    }

    await foundComment?.save();
    const savedLog = await LogModel.findById(data.logId)
      .populate({
        path: 'comments',
        populate: [
          { path: 'author', select: 'nickname avatar' },
          { path: 'replies.author', select: 'nickname avatar' },
        ],
      })
      .exec();
    revalidateTag('comment');
    return NextResponse.json(
      {
        success: true,
        comments: savedLog?.comments,
        message: 'comment added',
      },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e.message || 'an unknown error occurred' },
      { status: 500 },
    );
  }
});
