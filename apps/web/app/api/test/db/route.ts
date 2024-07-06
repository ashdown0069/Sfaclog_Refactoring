import { connectDB } from '@/lib/db';
import { NextResponse, type NextRequest } from 'next/server';
export async function GET(req: NextRequest) {
  try {
    const db = await connectDB();
    console.log('db connected');
    return NextResponse.json(
      {
        message: 'db connected',
        db,
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
