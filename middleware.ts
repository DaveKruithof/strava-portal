import { NextRequest, NextResponse } from 'next/server';
import { verifyUserCookie } from './lib/auth';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.includes('/api/strava')) return NextResponse.next();
  return verifyUserCookie(req);
}
