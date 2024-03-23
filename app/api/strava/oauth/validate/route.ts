import { users } from '@/db/schema/users';
import { setUserCookie } from '@/lib/auth';
import { STRAVA_OAUTH_LOGIN_PATH, getStravaClubId } from '@/lib/constants';
import { getClubs, validateOauthCode } from '@/lib/strava/StravaApi';
import getDatabase from '@/utils/db/getDatabase';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET({ nextUrl }: NextRequest) {
  const code = nextUrl.searchParams.get('code') || '';

  if (code) {
    const validatedCode = await validateOauthCode(code);

    if (validatedCode) {
      const clubs = await getClubs(validatedCode.access_token);

      if (
        clubs &&
        clubs.find((club) => club.id.toString() === getStravaClubId())
      ) {
        const db = getDatabase();
        const user: typeof users.$inferSelect | false = await db.query.users
          .findFirst({
            where: eq(users.strava_id, validatedCode.athlete.id),
          })
          .then((user) => {
            const userObject = {
              strava_id: validatedCode.athlete.id,
              firstname: validatedCode.athlete.firstname,
              lastname: validatedCode.athlete.lastname,
              avatar: validatedCode.athlete.profile,
              refresh_token: validatedCode.refresh_token,
              access_token: validatedCode.access_token,
              expires: new Date(validatedCode.expires_at * 1000),
            };

            if (user) return db.update(users).set(userObject).returning();
            return db.insert(users).values(userObject).returning();
          })
          .then((users) => users[0])
          .catch((e) => {
            console.error('user find/creation/update failed: ', e);
            return false;
          });

        if (user) {
          return setUserCookie({ user }, NextResponse.redirect(nextUrl.origin));
        }
      }
    }
  }

  return NextResponse.redirect(nextUrl.origin + STRAVA_OAUTH_LOGIN_PATH);
}
