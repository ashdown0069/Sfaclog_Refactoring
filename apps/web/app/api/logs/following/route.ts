import { NextRequest, NextResponse } from 'next/server';
import { LogModel } from '@/models/Log';
import type { ILog } from '@/models/Log';
import { UserModel } from '@/models/User';
import { connectDB } from '@/lib/db';
import { auth } from '@/auth/auth';

/**
 * Server Side GET api/logs/following
 */
export const GET = auth(async (req: NextRequest) => {
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

  const searchParams = req.nextUrl.searchParams;
  const followingUsersNickname = searchParams.get('user') || null;
  const { userId } = req.auth.user;
  let logs: ILog[] = [];
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error('can not found user');

    if (!followingUsersNickname && user.following.length > 0) {
      //팔로잉중인 유저가 존재할 때 그 유저들의 모든 로그 조회
      logs = await LogModel.find({ author: { $in: user.following } })
        .populate('author', 'nickname avatar -_id')
        .exec();
      await user.populate('following', 'nickname avatar -_id');
    } else if (followingUsersNickname && user.following.length > 0) {
      //한 유저의 로그들만 조회, 팔로잉중인 유저가 존재할 때
      //닉네임을 불러온 뒤
      await user.populate('following', 'nickname avatar');

      const foundUserInfo = user.following.find(
        //@ts-ignore
        user => user.nickname == followingUsersNickname,
      );

      //닉네임으로 조회
      const foundUser = await UserModel.findOne({
        //@ts-ignore
        nickname: foundUserInfo.nickname,
      });
      if (!foundUser) throw new Error('can not found user you searched for.');
      logs = await LogModel.find({ author: foundUser._id }).populate(
        'author',
        'nickname -_id',
      );
    }

    return NextResponse.json(
      { success: true, logs, followingUsers: user.following },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: 'unknown error occured while getting logs',
      },
      { status: 500 },
    );
  }
});
