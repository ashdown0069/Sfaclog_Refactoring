import { connectDB } from '@/lib/db';
import { UserModel } from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        userId: null,
      },
      { status: 500 },
    );
  }

  const data = await req.json();

  //디비에 유저가 존재하면
  try {
    const existingUser = await UserModel.findOne({ email: data.email });
    if (existingUser && existingUser.isOAuth) {
      return {
        success: true,
        userId: existingUser._id,
        avatar: existingUser.avatar,
      };
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        userId: null,
      },
      { status: 500 },
    );
  }

  //디비에 유저가 존재하지 않는다면
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const username = data.email.split('@')[0];
    let nickname = data.name;

    while (true) {
      const foundNickname = await UserModel.findOne({ nickname: nickname });
      if (!foundNickname) {
        break; // 중복되지 않는 닉네임 찾음
      }
      if (nickname.length < 12) {
        const additionalLength = Math.min(12 - nickname.length, 3); // 최대 3자를 추가합니다.
        nickname = nickname + generateRandomChars(additionalLength);
      } else {
        // 이미 12자이면 마지막 3자를 랜덤 문자로 대체
        nickname = nickname.slice(0, 9) + generateRandomChars(3);
      }
    }

    const createdUser = await new UserModel({
      isOAuth: true,
      email: data.email,
      username: username,
      legalname: data.name,
      nickname: nickname,
      avatar: data.picture,
      pageUrl: nickname,
      isVerified: true,
    }).save();
    //트랜잭션 커밋
    await session.commitTransaction();
    return {
      success: true,
      userId: createdUser._id,
      avatar: createdUser.avatar,
    };
  } catch (error) {
    //트랜잭션 롤백
    await session.abortTransaction();
    return NextResponse.json(
      {
        success: false,
        userId: null,
      },
      { status: 500 },
    );
  } finally {
    //트랜잭션 종료
    session.endSession();
  }
}

const generateRandomChars = (length: number) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)],
  ).join('');
};
