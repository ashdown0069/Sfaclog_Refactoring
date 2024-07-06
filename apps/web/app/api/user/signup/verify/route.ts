import { connectDB } from '@/lib/db';
import { UserModel } from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
/**
 * 사용자가 받은 이메일에서 링크를 클릭시
 * api/user/signup/verify 인 현재 경로로 요청을 보내기 때문에
 * redirect 만 사용해야함
 */
//이메일 인증 확인
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get('token'); // url에서 token을 가져옴
  if (!token) return NextResponse.redirect(new URL('/', req.url));
  try {
    await connectDB();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const foundUser = await UserModel.findOne({ verifyToken: token }).exec();
    if (foundUser) {
      //유저를 찾았다면
      foundUser.isVerified = true;
      foundUser.verifyToken = null;
      await foundUser.save();
      return NextResponse.redirect(new URL('/signup/welcome', req.url));
    } else {
      //유효하지 않는 토큰이거나 유저가 없다면
      return NextResponse.redirect(new URL('/', req.url));
    }
  } catch (err) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}
