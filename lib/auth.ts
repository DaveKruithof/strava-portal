import { SignJWT, jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import {
  STRAVA_OAUTH_LOGIN_PATH,
  USER_COOKIE_NAME,
  getJwtSecret,
} from './constants';
import { users } from '@/db/schema/users';

export class UnauthrorizedError extends Error {}

export type JwtPayload = { user: typeof users.$inferSelect };

export async function setUserCookie(payload: JwtPayload, res: NextResponse) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(new TextEncoder().encode(getJwtSecret()));

  res.cookies.set({
    name: USER_COOKIE_NAME,
    value: token,
    path: '/',
    expires: new Date(payload.user.expires ?? 0), // lifetime of strava access token +- 24h
  });

  return res;
}

export async function verifyUserCookie(req: NextRequest) {
  const token = req.cookies.get(USER_COOKIE_NAME)?.value;

  if (!token)
    return NextResponse.redirect(req.nextUrl.origin + STRAVA_OAUTH_LOGIN_PATH);

  return jwtVerify<JwtPayload>(token, new TextEncoder().encode(getJwtSecret()))
    .then((token) => {
      if (
        !token.payload.user.expires ||
        new Date(token.payload.user.expires).getTime() < Date.now()
      ) {
        const res = NextResponse.redirect(
          req.nextUrl.origin + STRAVA_OAUTH_LOGIN_PATH
        );

        res.cookies.set({
          name: USER_COOKIE_NAME,
          value: '',
          expires: new Date(0), // to unset cookie
        });

        return res;
      }

      return NextResponse.next();
    })
    .catch((e) => {
      console.error('invalid user token: ' + token, e);
      throw new UnauthrorizedError();
    });
}
