import { auth } from '@/auth/auth';
import { connectDB } from '@/lib/db';
import { UserModel } from '@/models/User';
import { isNumber } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

export const GET = auth(async (req: NextRequest) => {
  if (!req.auth) {
    return NextResponse.json(
      {
        success: false,
        message: 'Login required',
      },
      { status: 401 },
    );
  }
  const userId = req.auth.user.userId;
  const searchParams = req.nextUrl.searchParams;
  const filter = searchParams.get('filter') || 'following';
  const pageParam = searchParams.get('page') || '1';
  const page = parseInt(pageParam);

  if (!(filter == 'following' || filter == 'follower') || !isNumber(page)) {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request - filter or page params is not valid',
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
    const user = await UserModel.findOne({
      _id: userId,
      isDelete: { $ne: true },
    })
      .populate('follower', 'nickname avatar intro -_id')
      .populate('following', 'nickname avatar intro -_id')
      .lean()
      .exec();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 },
      );
    }
    if (filter == 'follower') {
      //팔로워 중에서 내가 이미 팔로잉 하고있는 경우 isFollowedUser: true 추가
      const follow = user.follower.map(cUser => {
        const isFollowedUser = user.following.some(t => {
          return t.nickname == cUser.nickname;
        });
        return {
          ...cUser,
          isFollowedUser: isFollowedUser,
        };
      });

      return NextResponse.json(
        {
          success: true,
          follow: follow,
          followingCount: user.following.length,
          followerCount: user.follower.length,
        },
        { status: 200 },
      );
    } else if (filter == 'following') {
      const following = user.following.map(cUser => {
        return { ...cUser, isFollowedUser: true };
      });
      return NextResponse.json(
        {
          success: true,
          follow: following,
          followingCount: user.following.length,
          followerCount: user.follower.length,
        },
        { status: 200 },
      );
    }
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
