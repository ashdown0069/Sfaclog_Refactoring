// import { auth } from '@/auth/auth';
// import { connectDB } from '@/lib/db';
// import { UserModel } from '@/models/User';
// import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth/auth';
import { connectDB } from '@/lib/db';
import { UserModel } from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { deleteAccountSchema } from '@/lib/validator';
// /**
//  * Server Side api/user
//  * @returns user
//  */
// export async function GET(req: NextRequest) {
//   const searchParams = req.nextUrl.searchParams;
//   const userId = searchParams.get('userId');
//   if (!userId) {
//     return NextResponse.json(
//       { success: false, message: 'userId is missing' },
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

//   try {
//     const foundUser = await UserModel.findById(userId, '-password').exec();
//     if (!foundUser) {
//       throw new Error('user not found');
//     }

//     return NextResponse.json(
//       { success: true, user: foundUser },
//       { status: 200 },
//     );
//   } catch (e: any) {
//     return NextResponse.json(
//       { success: false, message: e.message },
//       { status: 400 },
//     );
//   }
// }

/**
 * Client Side api/user
 * @description 유저 삭제 api - isDelete 를 true로 변경
 * @description 로그인 필요
 * @param body { password: string, reason: string}
 */

export const PATCH = auth(async (req: NextRequest) => {
  const data = await req.json();
  if (!req.auth) {
    return NextResponse.json(
      { success: false, message: 'unauthorized - not logged in' },
      { status: 400 },
    );
  }

  if (!data.password || !data.reason) {
    return NextResponse.json(
      { success: false, message: 'password or reason is missing' },
      { status: 400 },
    );
  }

  try {
    await connectDB();
  } catch (e) {
    return NextResponse.json(
      { success: false, message: 'can not connect to database' },
      { status: 500 },
    );
  }

  const userId = req.auth.user.userId;
  try {
    const parsedData = deleteAccountSchema.parse(data);
    const foundUser = await UserModel.findById(userId).exec();
    if (!foundUser) {
      throw new Error('user not found');
    }

    const isPasswordMatch = await bcrypt.compare(
      parsedData.password,
      foundUser.password,
    );

    if (!isPasswordMatch) {
      throw new Error('password is not correct');
    }

    foundUser.isDelete = true;
    await foundUser.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e.message },
      { status: 400 },
    );
  }
});
