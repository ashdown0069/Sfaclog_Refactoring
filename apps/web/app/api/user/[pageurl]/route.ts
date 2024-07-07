import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { UserModel } from '@/models/User';
import { auth } from '@/auth/auth';
import type { IUser } from '@/models/User';
import { LogModel } from '@/models/Log';

// export const GET = auth(
//   async (req: NextRequest, params: { nickname: string }) => {},
// );

/**
 * Server Side GET api/user/[pageurl]
 * @param `pageurl 초기설정은 닉네임과같음
 * @description Server Side에서 사용 next/headers의 headers를 불러와서 GET 요청해야함
 * @description /user/[pageurl] 에서 profilecard 컴포넌트의 유저정보로 사용
 * @returns user, logs 유저정보, 유저가 최근에 작성한 로그 3개
 */

export async function GET(
  req: NextRequest,
  { params }: { params: { pageurl: string } },
) {
  //로그인 필요
  // if (!req.auth) {
  //   return NextResponse.json(
  //     {
  //       message: 'Login required',
  //     },
  //     { status: 401 },
  //   );
  // }
  //파라미터 필요
  if (!params.pageurl) {
    return NextResponse.json(
      {
        message: 'Parameter not found',
      },
      { status: 401 },
    );
  }
  //DB 연결
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

  //pageurl 로 유저 조회하기

  try {
    const foundUser = (await UserModel.findOne(
      {
        pageUrl: params.pageurl,
        isDelete: { $ne: true },
      },
      'nickname avatar intro sns career following follower pageUrl',
    ).exec()) as IUser | null;
    if (!foundUser) throw new Error('Can not found user');

    const logs = await LogModel.find({
      author: foundUser._id,
      isDelete: { $ne: true },
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean()
      .exec();
    return NextResponse.json(
      {
        success: true,
        user: foundUser,
        logs,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        logs: [],
        user: null,
      },
      { status: 500 },
    );
  }
}
