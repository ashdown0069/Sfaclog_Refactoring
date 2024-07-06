import { connectDB } from '@/lib/db';
import { UserModel } from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
//이메일, 닉네임, 아이디, 페이지URL 중복체크 로직
/**
 * Client Side GET api/user/signup/check?type=${type}&data=${data}
 * @searchParams type=[email, nickname, username, pageUrl]
 * @searchParams data=[email, nickname, username, pageUrl]
 * @returns isDuplicate:boolean
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get('type'); //[email, nickname, username, pageUrl] type
  const data = searchParams.get('data'); //[email, nickname, username, pageUrl] data
  if (!type || !data) {
    return NextResponse.json(
      {
        success: false,
        message: 'invalid request, type and data are required',
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
    const foundData = await UserModel.findOne({ [type]: data }).exec();
    if (foundData) {
      //데이터가 존재하면 중복이므로 true
      return NextResponse.json({ isDuplicate: true }, { status: 200 });
    } else {
      //데이터가 존재하지 않기 때문에 false
      return NextResponse.json({ isDuplicate: false }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json(
      {
        message: 'unknown error occured while checking data duplication',
      },
      { status: 500 },
    );
  }
}
