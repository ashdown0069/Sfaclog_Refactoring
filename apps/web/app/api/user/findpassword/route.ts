import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { UserModel } from '@/models/User';
import { sendResetPasswordEmail } from '@/lib/nodemailer';
//비밀번호 재설정 이메일 발송
export async function POST(req: NextRequest) {
  const { username, email } = await req.json();

  if (!username || !email) {
    return NextResponse.json(
      { isSend: false, message: 'username or email is empty' },
      { status: 400 },
    );
  }

  try {
    await connectDB();
  } catch (e) {
    return NextResponse.json(
      { isSend: false, message: 'can not connect to db' },
      { status: 500 },
    );
  }

  try {
    const foundUser = await UserModel.findOne({ username, email }).exec();
    if (!foundUser) {
      return NextResponse.json(
        { isSend: false, message: 'user not found' },
        { status: 400 },
      );
    }
    //비밀번호 재설정을 위한 토큰 재발급, db에도 토큰이 추가됨
    const token = foundUser.regenToken();
    const result = await sendResetPasswordEmail(email, token.toString());
    if (!result) {
      return NextResponse.json(
        { isSend: false, message: 'can not send email' },
        { status: 500 },
      );
    }
    return NextResponse.json({ isSend: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ isSend: false }, { status: 400 });
  }
}
