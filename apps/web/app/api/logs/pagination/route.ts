import { NextRequest, NextResponse } from 'next/server';
import { LogModel } from '@/models/Log';
import { connectDB } from '@/lib/db';
import { logsCategoryList } from '@/constant';
type SortOrder = 1 | -1; //-1 내림차순, 1 오름차순
type SortingType = 'latest' | 'oldest' | 'popular';
const sortingQuery: Record<SortingType, { [key: string]: SortOrder }> = {
  latest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  popular: { likes: -1 },
};

/**
 * Server Side
 * @description getLogsData 함수에서 사용
 * @searchParams category,page,sort 필요
 * @returns logs[]
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get('category') || 'all';
  const page = searchParams.get('page') || '1';
  const sortingType = (searchParams.get('sort') || 'latest') as SortingType; // [latest, oldest, popular]
  const limit = 9; //페이지당 로그 갯수
  const parsedPage = parseInt(page); //page number

  //searchParams validation
  if (
    !['latest', 'oldest', 'popular'].includes(sortingType) ||
    isNaN(parsedPage) ||
    parsedPage < 1 ||
    !logsCategoryList.includes(category)
  ) {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request',
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
    const query =
      category === 'all'
        ? { isDelete: { $ne: true } }
        : { category, isDelete: { $ne: true } };
    const logs = await LogModel.find(query)
      .populate('author', 'nickname pageUrl avatar')
      .sort(sortingQuery[sortingType])
      .skip((parsedPage - 1) * limit)
      .limit(limit)
      .exec();

    return NextResponse.json({ logs, success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: 'unknown error occured while getting logs',
      },
      { status: 500 },
    );
  }
}
