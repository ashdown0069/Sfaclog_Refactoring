import { connectDB } from '@/lib/db';
import { UserModel } from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
//이메일, 닉네임, 아이디 중복체크 로직
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get('type'); //[email, nickname, username] type
  const data = searchParams.get('data'); //[email, nickname, username] data
  try {
    await connectDB();
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: 'can not connect to database',
      },
      { status: 400 },
    );
  }
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
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
      { status: 400 },
    );
  }
}
