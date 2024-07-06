import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { LogModel } from '@/models/Log';

/**
 * Server Side
 * @description 유저의 objectId로 유저가 생성한 로그를 가져오는 API 최근 3개만 가져옴
 * @param param.id 유저의 objectId
 * @returns [log1, log2, log3]
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
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
    //최근에 작성한 글 3개만 가져오기 생성일자 내림차순
    const logs = await LogModel.find({
      author: params.id,
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean()
      .exec();
    return NextResponse.json(logs, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: 'unknown error occured while fetching logs',
      },
      { status: 500 },
    );
  }
}
