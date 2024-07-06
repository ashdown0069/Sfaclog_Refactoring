import { auth } from '@/auth/auth';
import { connectDB } from '@/lib/db';
import { NextResponse, type NextRequest } from 'next/server';

export const GET = auth(async (req: NextRequest) => {
  if (!req.auth) {
    return NextResponse.json(
      {
        message: 'login required',
      },
      { status: 401 },
    );
  }
  try {
    await connectDB();
    console.log('db connected');
  } catch (err) {
    return NextResponse.json(
      {
        message: 'can not connect to database ',
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      message: 'success',
    },
    { status: 200 },
  );
});
