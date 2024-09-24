import { auth } from '@/auth/auth';
import { connectDB } from '@/lib/db';
import { UserModel } from '@/models/User';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

/**
 * Client Side PATCH api/mypage/follow
 * @description 팔로우, 언팔로우하는 API
 * @description 로그인 필요
 * @description Body: { nickname: string }
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

  const data = await req.json();

  if (!data.nickname) {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request - nickname is required',
      },
      { status: 400 },
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

  try {
    //닉네임으로 유저 찾기 - 팔로우할 유저
    const addedUser = await UserModel.findOne({
      nickname: data.nickname,
      isDelete: { $ne: true },
    });

    if (!addedUser) {
      throw new Error('addedUser not found');
    }

    const currentUser = await UserModel.findById(req.auth.user.userId);
    if (!currentUser) {
      throw new Error('currentUser not found');
    }

    if (currentUser.following.includes(addedUser._id)) {
      //배열안에 존재하면 팔로우 취소
      currentUser.following = currentUser.following.filter(
        id => id.toString() !== addedUser._id.toString(),
      );

      addedUser.follower = addedUser.follower.filter(
        id => id.toString() !== currentUser._id.toString(),
      );
    } else {
      //배열안에 존재하지 않으면 팔로우
      currentUser.following.push(addedUser._id);
      addedUser.follower.push(currentUser._id);
      addedUser.notifications.push({
        notiType: 'follow',
        isRead: false,
        notifierId: currentUser._id,
      });
    }

    await currentUser.save();
    await addedUser.save();
    revalidateTag('follow');
    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    );
  }
});
