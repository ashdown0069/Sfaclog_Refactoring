import { connectDB } from '@/lib/db';
import { LogModel } from '@/models/Log';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth/auth';
import { UserModel } from '@/models/User';
/**
 * Server Side GET api/mypage/mynotifications?page={number}
 * @description mypage 에서 알림을 가져오는 api
 * @description Server side에서 fetch사용시 헤더에 next/headers로 헤더를 불러와 첨부해야함
 * @description searchParams: page={number}
 */
export const GET = auth(async (req: NextRequest) => {
  if (!req.auth) {
    return NextResponse.json(
      {
        success: false,
        message: 'Unauthorized - user not logged in',
      },
      { status: 401 },
    );
  }
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';
  const userId = req.auth.user.userId;

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
    const user = await UserModel.findById(userId)
      .populate({
        path: 'notifications',
        populate: {
          path: 'notifierId',
          select: 'nickname avatar pageUrl -_id',
        },
      })
      .populate({
        path: 'notifications',
        populate: {
          path: 'triggerLog',
          select: 'title _id',
        },
      })
      .sort({ createdAt: -1 })
      .limit(6)
      .skip((parseInt(page) - 1) * 6)
      .exec();
    if (!user) {
      throw new Error('User not found');
    }
    if (user.notifications.length == 0) {
      return NextResponse.json(
        {
          success: true,
          notifications: [],
          length: 0,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        notifications: user.notifications,
        length: user.notifications.length,
      },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        message: e.message,
      },
      { status: 500 },
    );
  }
});
