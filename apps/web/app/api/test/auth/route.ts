import { auth } from '@/auth/auth';
import { NextRequest, NextResponse } from 'next/server';

export const GET = auth(async (req: NextRequest) => {
  return NextResponse.json({
    auth: req.auth,
  });
});
