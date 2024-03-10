import { connectDB } from '@/lib/db';
import mongoose from 'mongoose';
import { UserModel } from '@/models/User';
import type { User } from '@/models/User';
import { NextResponse } from 'next/server';
import { SignupSchema } from '@/lib/validator';
import type { NextRequest } from 'next/server';
import type { SignupDataType } from '@/lib/validator';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from '@/lib/nodemailer';
//유저 회원가입 route
export async function POST(req: NextRequest) {
  const data = await req.json();

  //유효성 검사
  let parsedData: Partial<SignupDataType>;
  try {
    parsedData = SignupSchema.parse(data);
    delete parsedData.passwordConfirm;
  } catch (err) {
    return NextResponse.json(
      { success: false, message: 'validation error, try again' },
      { status: 400 },
    );
  }

  //db 연결
  try {
    await connectDB();
  } catch (err) {
    return NextResponse.json(
      {
        message: 'can not connect to database',
      },
      { status: 400 },
    );
  }

  //트랜잭션 시작
  let createdUser: User;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (parsedData.password && parsedData.email) {
      const hash = await bcrypt.hash(parsedData.password, 10);
      createdUser = await new UserModel({
        ...parsedData,
        password: hash,
        pageUrl: parsedData.username,
      }).save();

      if (createdUser && createdUser.email && createdUser.verifyToken) {
        const result = await sendVerificationEmail(
          createdUser.email,
          createdUser.verifyToken?.toString(),
        );
        //이메일 보내기 실패시
        if (!result) {
          throw new Error('email sending error');
        }
      }
      //트랜잭션 커밋
      await session.commitTransaction();
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    //트랜잭션 롤백
    await session.abortTransaction();
    return NextResponse.json(
      { success: false, message: `can not create user - ${error.message}` },
      { status: 400 },
    );
  } finally {
    //트랜잭션 종료
    session.endSession();
  }
}
