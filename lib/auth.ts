import { SignJWT, jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { USER_COOKIE_NAME, getJwtSecret } from './constants';

export type UserPayload = {
  bearer: string;
  expiresAt: number;
};

export class UnauthrorizedError extends Error {}

export async function setUserCookie(payload: UserPayload, res: NextResponse) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(new TextEncoder().encode(getJwtSecret()));

  res.cookies.set({
    name: USER_COOKIE_NAME,
    value: token,
    path: '/',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 14 days lifetime
  });

  return res;
}

export async function verifyUserCookie(req: NextRequest) {
  const token = req.cookies.get(USER_COOKIE_NAME)?.value;

  if (!token)
    return NextResponse.redirect(
      req.nextUrl.origin + '/api/strava/oauth/login'
    );

  try {
    var verifiedToken = await jwtVerify<UserPayload>(
      token,
      new TextEncoder().encode(getJwtSecret())
    );
  } catch (e) {
    throw new UnauthrorizedError();
  }

  if (Date.now() > verifiedToken.payload.expiresAt) {
  }

  return NextResponse.next();
}
