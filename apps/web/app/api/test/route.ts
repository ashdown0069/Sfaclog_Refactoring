import { auth } from '@/auth/auth';
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

  return NextResponse.json(
    {
      message: 'success',
    },
    { status: 200 },
  );
});
