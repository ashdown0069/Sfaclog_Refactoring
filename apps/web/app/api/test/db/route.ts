import { connectDB } from '@/lib/db';
import { NextResponse, type NextRequest } from 'next/server';
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    return NextResponse.json(
      {
        message: 'db connected',
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: 'can not connect to database ',
      },
      { status: 500 },
    );
  }
}
