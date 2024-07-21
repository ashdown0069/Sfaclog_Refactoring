import { auth } from '@/auth/auth';
import { connectDB } from '@/lib/db';
import { DeleteAvatarFromFireBase } from '@/lib/firebase';
import { interestsSchema, profileEditSchema } from '@/lib/validator';
import { UserModel } from '@/models/User';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

/**
 * Client Side PATCH api/mypage
 * @description 개인정보 수정
 * @description 로그인 필요
 * @description Body: { nickname: user.nickname,
                        pageUrl: user.pageUrl,
                        career: user.career,
                        sns: user.sns, }
 */

export const PATCH = auth(async (req: NextRequest) => {
  if (!req.auth) {
    return NextResponse.json(
      {
        success: false,
        message: 'Unauthorized - user not logged in',
      },
      { status: 401 },
    );
  }
  const { userId } = req.auth.user;
  const data = await req.json();
  const result = profileEditSchema.safeParse(data);
  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        message: result.error.message,
      },
      { status: 400 },
    );
  }

  //safeParse에서 빈 요소들도 통과하므로 필터링해줘야함
  //빈 URL INPUT 필터링
  const filteredSnsUrl = result.data.sns.filter(el => el.url);

  //빈 Career INPUT 필터링
  const filteredCareer = result.data.career.filter(
    el => el.company && el.company && el.startDate,
  );
  result.data.sns = filteredSnsUrl;
  result.data.career = filteredCareer;

  //db 연결
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
    //사용자 조회
    const currentUser = await UserModel.findById(userId);
    if (!currentUser) {
      throw new Error('can not found user');
    }

    //클라이언트 상에서는 중복여부만 검사하기 때문에 밑의 로직필요

    //중복된 nickname, pageUrl 이 존재하는지 찾기
    const foundNickname = await UserModel.findOne({
      nickname: result.data.nickname,
    });
    const foundpageUrl = await UserModel.findOne({
      pageUrl: result.data.pageUrl,
    });

    //개인정보 수정 중복체크 통과여부
    let isPass = false;
    if (!foundNickname && !foundpageUrl) {
      //둘다 찾지 못했으면 중복된 닉네임이 없으므로 isPass = true
      isPass = true;
    } else if (!foundNickname && foundpageUrl) {
      //foundpageUrl 하나만 존재하고 소유자인경우 isPass = true
      const isOwner = foundpageUrl._id.toString() === userId;
      isPass = isOwner;
    } else if (foundNickname && !foundpageUrl) {
      //foundNickname 하나만 존재하고 소유자인경우 isPass = true
      const isOwner = foundNickname._id.toString() === userId;
      isPass = isOwner;
    } else if (foundNickname && foundpageUrl) {
      //둘다 존재하는 경우
      const isOwner =
        foundNickname._id.toString() == userId &&
        foundpageUrl._id.toString() == userId;
      isPass = isOwner;
    }

    //관심사 유효성검사
    const interestResult = interestsSchema.safeParse(data.interests);
    if (!interestResult.success) isPass = false;
    if (!isPass) {
      throw new Error(
        'Cannot update personal information due to the existence of duplicate values',
      );
    }

    currentUser.nickname = result.data.nickname;
    currentUser.pageUrl = result.data.pageUrl;
    currentUser.career = result.data.career;
    currentUser.sns = result.data.sns;
    currentUser.intro = result.data.intro;
    currentUser.interests = interestResult.data || [];

    //기존 아바타 URL이 존재하고
    //파이어베이스 이미지 주소로 시작하면
    //기존 파이어베이스 이미지삭제하고 링크교체
    if (
      currentUser.avatar !== '' &&
      data.url.startsWith('https://firebasestorage.googleapis.com')
    ) {
      DeleteAvatarFromFireBase(currentUser.avatar);
      currentUser.avatar = data.url;
    } else if (
      currentUser.avatar == '' &&
      data.url.startsWith('https://firebasestorage.googleapis.com')
    ) {
      //아바타 URL이 존재하지않고 파이어베이스 이미지 URL의 경우 링크 교체
      currentUser.avatar = data.url;
    }

    const updatedUser = await currentUser.save();
    return NextResponse.json(
      {
        success: true,
        avatar: updatedUser.avatar,
        nickname: updatedUser.nickname,
      },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    );
  }
});
