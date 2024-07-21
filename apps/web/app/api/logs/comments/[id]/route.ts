import { auth } from '@/auth/auth';
import { connectDB } from '@/lib/db';
import { CommentsModel } from '@/models/Comments';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 *
 * @description Client Side DELETE api/log/comments/[id]
 * @description 나의 코멘트 삭제 api
 * @description 로그인 필요
 * @param params.id 삭제할 코멘트 아이디
 */
export const DELETE = auth(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
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

    const commentId = params.id;
    const { userId } = req.auth.user;
    if (!commentId) {
      return NextResponse.json(
        { success: false, message: 'comment id is required' },
        { status: 400 },
      );
    }

    try {
      const foundComment = await CommentsModel.findOne({
        $or: [
          { _id: commentId, author: userId },
          {
            replies: {
              $elemMatch: { _id: commentId, author: userId },
            },
          },
        ],
      }).exec();
      if (!foundComment) {
        return NextResponse.json(
          { success: false, message: 'comment not found' },
          { status: 404 },
        );
      }

      if (foundComment?._id.toString() === commentId) {
        foundComment.isDelete = true;
      } else if (foundComment.replies) {
        foundComment.replies = foundComment.replies.map(reply => {
          if (reply._id && reply._id.toString() === commentId) {
            reply.isDelete = true;
          }
          return reply;
        });
      }
      await foundComment.save();
      revalidatePath('comment');
      return NextResponse.json(
        { success: true, message: 'comments have been deleted' },
        { status: 200 },
      );
    } catch (e: any) {
      return NextResponse.json(
        { success: false, message: e.message },
        { status: 500 },
      );
    }
  },
);
