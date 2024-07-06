import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { UserModel } from '@/models/User';
import { auth } from '@/auth/auth';
import { LogModel } from '@/models/Log';

// export const GET = auth(
//   async (req: NextRequest, params: { nickname: string }) => {},
// );

/**
 * Server Side GET api/user/[pageurl]
 * @param pageurl 초기설정은 닉네임과같음
 * @description Server Side에서 사용 next/headers의 headers를 불러와서 GET 요청해야함
 * @description /user/[pageurl] 에서 profilecard 컴포넌트의 유저정보로 사용
 * @returns user
 */

export async function GET(
  req: NextRequest,
  { params }: { params: { pageurl: string } },
) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';
  const parsedPage = parseInt(page); //page number
  const limit = 6; //페이지당 로그 갯수
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
  //   if (!params.pageurl) {
  //     return NextResponse.json(
  //       {
  //         message: 'Parameter not found',
  //       },
  //       { status: 401 },
  //     );
  //   }
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
    const foundUser = await UserModel.findOne({ pageUrl: params.pageurl });
    if (!foundUser) throw new Error('Can not found user');

    const logs = await LogModel.find({
      author: foundUser._id,
      isDelete: { $ne: true },
    })
      .populate('author', 'nickname')
      .limit(limit)
      .skip((parsedPage - 1) * limit)
      .exec();

    const logsLength =
      (await LogModel.countDocuments({
        author: foundUser._id,
        isDelete: { $ne: true },
      })) || 0;

    return NextResponse.json(
      { logs, length: logsLength, success: true },
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
}
