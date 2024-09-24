import { auth } from '@/auth/auth';
import { NextRequest, NextResponse } from 'next/server';
import { LogModel } from '@/models/Log';
import { revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/db';
import { CommentsModel } from '@/models/Comments';
import { CommentSchema } from '@/lib/validator';
import { UserModel } from '@/models/User';

/**
 * Client Side: POST /api/logs/comments
 * @description 댓글을 추가하는 API
 * @description 로그인 필요
 * @param comment 댓글 내용
 * @param logId 로그의 _id
 * @returns IComment[] 댓글 목록 리턴
 */

export async function POST(req: NextRequest, res: NextResponse) {
  return auth(async () => {
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
      if (!data.comment || !data.logId) {
        throw new Error('comment or logId is missing');
      }
      const parsedContent = CommentSchema.parse(data.comment);
      const newComment = new CommentsModel({
        author: userId,
        content: parsedContent,
        log: data.logId,
      });

      const log = await LogModel.findById(data.logId);
      //못찾으면 null 리턴함
      if (!log) {
        throw new Error('log not found');
      }
      log.comments.push(newComment);
      await newComment.save();

      //log의 소유자에게 알림보내기
      //로그의 소유자와 코멘트 소유자와 같지 않으면 알림 x
      const logOwnerId = log.author;
      if (logOwnerId !== userId) {
        const foundUser = await UserModel.findById(logOwnerId).exec();
        if (!foundUser) {
          throw new Error('user not found');
        }
        foundUser.notifications.push({
          notiType: 'comment',
          isRead: false,
          notifierId: userId,
          triggerLog: log._id,
        });
        await foundUser.save();
      }

      await log.save();
      const savedLog = await LogModel.findById(log?._id)
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
        { success: false, message: e.message },
        { status: 500 },
      );
    }
  })(req, res);
}
