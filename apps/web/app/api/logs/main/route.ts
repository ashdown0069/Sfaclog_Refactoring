import { NextRequest, NextResponse } from 'next/server';
import { LogModel } from '@/models/Log';
import { connectDB } from '@/lib/db';
import { UserModel } from '@/models/User';
import { Types } from 'mongoose';

/**
 * Server Side / GET api/logs/main
 * @description 메인 페이지 인기로그 추천로그 각 6개 리턴
 * @return popularLogs: logs[], recommendLogs: logs[]
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get('userId') || '';
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
    //현재날짜 기준 3개월 전까지의 인기순으로 6개 조회
    //인기로그
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const popularLogs = await LogModel.find({
      createdAt: { $gte: threeMonthsAgo },
    })
      .populate('author', 'nickname pageUrl avatar')
      .sort({ likes: -1 }) // likes를 기준으로 내림차순 정렬
      .limit(6);

    let recommendLogs = [];
    let user = null;
    //추천로그
    //로그인 상태인 경우, 관심사를 설정했다면
    const isValidId = Types.ObjectId.isValid(userId);
    if (isValidId) {
      user = await UserModel.findById(userId).exec();
    }
    if (user && user.interests.length > 0) {
      const foundLogs = await LogModel.find({
        category: { $in: user.interests },
      })
        .populate('author', 'nickname pageUrl avatar')
        .limit(30)
        .exec();
      // 항목들을 랜덤으로 섞음
      const shuffledItems = foundLogs.sort(() => 0.5 - Math.random());
      // 랜덤으로 섞인 항목들 중에서 6개만 선택
      recommendLogs = shuffledItems.slice(0, 6);
    } else {
      //로그인 상태가 아니면 최신 로그 50개 뽑아서 랜덤으로 6개만 선택
      const foundLogs = await LogModel.find()
        .populate('author', 'nickname pageUrl avatar')
        .sort({ createdAt: -1 })
        .limit(50)
        .exec();
      // 항목들을 랜덤으로 섞음
      const shuffledItems = foundLogs.sort(() => 0.5 - Math.random());
      // 랜덤으로 섞인 항목들 중에서 6개만 선택
      recommendLogs = shuffledItems.slice(0, 6);
    }

    return NextResponse.json(
      {
        success: true,
        popularLogs,
        recommendLogs,
      },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'unknown error occured while getting logs',
      },
      { status: 500 },
    );
  }
}
