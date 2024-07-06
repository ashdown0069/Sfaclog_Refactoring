import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { LogModel } from '@/models/Log';
import { auth } from '@/auth/auth';

/**
 * Client Side: POST /api/logs/comments
 * @description log/[id]에 해당하는 로그 정보를 가져오는 API
 * @param id 로그의 _id
 * @returns { Ilog } 리턴
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
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
  const logId = params.id;
  try {
    // const logs = await LogModel.findById(logId)
    //   .populate('author', 'following follower nickname avatar intro sns career')
    //   .populate({
    //     path: 'comments',
    //     populate: [
    //       { path: 'author', select: 'nickname avatar' },
    //       {
    //         path: 'replies',
    //         populate: { path: 'author', select: 'nickname avatar' },
    //       },
    //     ],
    //   })
    //   .lean()
    //   .exec();
    const logs = await LogModel.findByIdAndUpdate(
      logId,
      { $inc: { views: 1 } }, // views 필드 증가
      { new: true }, // 업데이트된 문서 반환
    )
      .populate(
        'author',
        'following follower nickname avatar intro sns career pageUrl',
      )
      .populate({
        path: 'comments',
        populate: [
          { path: 'author', select: 'nickname avatar pageUrl' },
          {
            path: 'replies',
            populate: { path: 'author', select: 'nickname avatar pageUrl' },
          },
        ],
      })
      .lean()
      .exec();

    if (!logs) {
      return NextResponse.json(
        {
          success: false,
          message: 'No logs found with the provided ID',
        },
        { status: 404 },
      );
    }

    //isDelete가 true인 코멘트는 삭제된 코멘트로 표시
    if (logs && logs.comments) {
      logs.comments = logs.comments.map(comment => {
        if (comment.isDelete) {
          comment.content = '삭제된 코멘트입니다';
        }
        if (comment.replies) {
          comment.replies = comment.replies.map(reply => {
            if (reply.isDelete) {
              reply.content = '삭제된 코멘트입니다';
            }
            return reply;
          });
        }
        return comment;
      });
    }

    return NextResponse.json(logs, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || 'unknown error occured while fetching logs',
      },
      { status: 500 },
    );
  }
}

export const DELETE = auth(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    //route protect 로그인이 되어있지 않으면 401을 반환
    if (!req.auth) {
      return NextResponse.json(
        { success: false, message: 'unauthorized - not logged in' },
        { status: 401 },
      );
    }
    //mongo db user id
    const { userId } = req.auth.user;
    // log id
    const { id } = params;

    //id를 통해 로그를 조회한 뒤 로그의 항목의 author id가
    // userId와 같은지 확인

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

    try {
      const log = await LogModel.findById(id).exec();

      //로그가 없을 경우 404를 반환
      if (!log) {
        return NextResponse.json(
          {
            success: false,
            message: 'log not found',
          },
          { status: 404 },
        );
      }
      //로그의 author id와 userId가 다를 경우 401을 반환
      if (!(log?.author.toString() === userId.toString())) {
        return NextResponse.json(
          {
            success: false,
            message: 'unauthorized user',
          },
          { status: 401 },
        );
      }

      log.isDelete = true;
      await log.save();
      return NextResponse.json(
        {
          success: true,
          message: 'log deleted',
        },
        { status: 200 },
      );
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          message: 'unknown error occured while deleting logs',
        },
        { status: 500 },
      );
    }
  },
);
