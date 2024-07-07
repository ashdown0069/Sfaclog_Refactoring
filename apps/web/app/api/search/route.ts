import { connectDB } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { LogModel } from '@/models/Log';
import { UserModel } from '@/models/User';
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('query');
  if (!query) {
    return NextResponse.json({
      success: true,
      logs: [],
      users: [],
      length: 0,
    });
  }
  try {
    await connectDB();
  } catch (e) {
    return NextResponse.json(
      { success: false, message: 'can not connect to database' },
      { status: 500 },
    );
  }

  try {
    const regex = new RegExp(query, 'i');
    const logs = await LogModel.find({
      $or: [{ title: regex }, { logConentHTML: regex }],
      isDelete: false,
      isVisibility: true,
    })
      .populate('author', 'nickname avatar -_id')
      .exec();

    const users = await UserModel.find({
      $or: [{ nickname: regex }, { intro: regex }, { 'career.company': regex }],
    }).exec();
    const length = logs.length + users.length;
    return NextResponse.json(
      {
        success: true,
        logs: logs,
        users: users,
        length: length,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: true,
        logs: [],
        users: [],
        length: 0,
      },
      { status: 500 },
    );
  }
}
