import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { UserModel } from '@/models/User';
import bcrypt from 'bcryptjs';
//비밀번호 재설정
export async function POST(req: NextRequest) {
  const { password, passwordConfirm, token } = await req.json();
  //비밀번호 재설정을 위한 토큰, 비밀번호 확인
  if (!password || !passwordConfirm || !token || password !== passwordConfirm) {
    return NextResponse.json(
      { isChange: false, message: 'Invalid data, Promiselease try again' },
      { status: 400 },
    );
  }

  const SALTROUNDS = 10;
  try {
    //db 연결
    await connectDB();
    //비밀번호 재설정을 위한 토큰으로 유저 찾기
    const foundUser = await UserModel.findOne({ verifyToken: token }).exec();
    if (!foundUser) {
      return NextResponse.json({ isChange: false }, { status: 400 });
    }
    //비밀번호 변경
    const hash = await bcrypt.hash(password, SALTROUNDS);
    foundUser.password = hash;
    foundUser.verifyToken = null;
    await foundUser.save();

    return NextResponse.json({ isChange: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ isChange: false }, { status: 400 });
  }
}
