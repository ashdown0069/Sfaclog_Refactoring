import { connectDB } from '@/lib/db';
import { LogModel } from '@/models/Log';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth/auth';
import { UserModel } from '@/models/User';
import { revalidateTag } from 'next/cache';
/**
 * Server Side GET api/mypage/mylog?page={number}
 * @description 네비게이션에서 읽지않은 알림의 숫자를 가져오는 api
 * @description Server side에서 fetch사용시 헤더에 next/headers로 헤더를 불러와 첨부해야함
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
    const user = await UserModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }
    const unReadNotifications = user.notifications.filter(
      el => el.isRead === false,
    ).length;
    if (user.notifications.length == 0) {
      return NextResponse.json(
        {
          success: true,
          length: 0,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        length: unReadNotifications,
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

/**
 * @description 마이페이지 알림페이지에 접속할 경우 알림을 읽은 것으로 변경
 * @description Server side에서 fetch사용시 헤더에 next/headers로 헤더를 불러와 첨부해야함
 */
export const PATCH = auth(async (req: NextRequest) => {
  if (!req.auth) {
    return NextResponse.json(
      {
        success: false,
        message: 'Unauthorized - user not logged in',
      },
      { status: 401 },
    );
  }
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
    const user = await UserModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }
    user.notifications = user.notifications.map(notification => ({
      ...notification,
      isRead: true,
    }));
    await user.save();
    revalidateTag('notifications');
    return NextResponse.json(
      {
        success: true,
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
