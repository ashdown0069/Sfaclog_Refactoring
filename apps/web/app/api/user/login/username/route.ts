import { connectDB } from '@/lib/db';
import { UserModel } from '@/models/User';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
/**
 * login route
 * auth/auth.ts folder
 * @description POST api/user/login/username
 * @returns user
 */

export async function POST(req: NextRequest) {
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

  const data = await req.json();

  try {
    const username = data.username;
    const foundUser = await UserModel.findOne({ username }).exec();
    if (!foundUser) {
      throw new Error('user not found');
    }

    const isPasswordMatch = await bcrypt.compare(
      data.password,
      foundUser.password,
    );

    if (isPasswordMatch) {
      let user = {
        userId: foundUser._id,
        name: foundUser.nickname,
        email: foundUser.email,
        image: foundUser.avatar || '/images/Avatar.png',
      };
      return NextResponse.json({ success: true, user: user }, { status: 200 });
    } else {
      return NextResponse.json({ success: true, user: null }, { status: 200 });
    }
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e.message },
      { status: 500 },
    );
  }
}
