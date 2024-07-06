import { connectDB } from '@/lib/db';
import { LogModel } from '@/models/Log';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth/auth';

/**
 * Server Side GET api/mypage/mylog/[id]?page={number}
 * @description mypage 에서 나의 로그들을 가져오는 api
 * @description Server side에서 fetch사용시 헤더에 next/headers로 헤더를 불러와 첨부해야함
 * @description searchParams: page={number}
 * @returns user
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
    const logs = await LogModel.find({
      likedUsers: userId,
      isDelete: { $ne: true },
    })
      .sort({ createdAt: -1 })
      .limit(6)
      .skip((parseInt(page) - 1) * 6)
      .exec();
    const logsLength = await LogModel.countDocuments({
      likedUsers: userId,
      isDelete: { $ne: true },
    });
    if (logs.length == 0) {
      return NextResponse.json(
        {
          success: true,
          logs: [],
          length: 0,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        logs,
        length: logsLength,
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
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   const searchParams = req.nextUrl.searchParams;
//   const page = searchParams.get('page') || '1';
//   if (!params.id || !page || !mongoose.Types.ObjectId.isValid(params.id)) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Invalid request - id or page params is required',
//       },
//       { status: 400 },
//     );
//   }
//   try {
//     await connectDB();
//   } catch (err) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'can not connect to database',
//       },
//       { status: 500 },
//     );
//   }

//   const userId = params.id;

//   try {
//     const logs = await LogModel.find({
//       likedUsers: userId,
//       isDelete: { $ne: true },
//     })
//       .sort({ createdAt: -1 })
//       .limit(6)
//       .skip((parseInt(page) - 1) * 6)
//       .exec();
//     const logsLength = await LogModel.countDocuments({
//       likedUsers: userId,
//       isDelete: { $ne: true },
//     });
//     if (logs.length == 0) {
//       return NextResponse.json(
//         {
//           success: true,
//           logs: [],
//           length: 0,
//         },
//         { status: 200 },
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         logs,
//         length: logsLength,
//       },
//       { status: 200 },
//     );
//   } catch (e: any) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: e.message,
//       },
//       { status: 500 },
//     );
//   }
// }
