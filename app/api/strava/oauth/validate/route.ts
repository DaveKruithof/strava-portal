import { users } from '@/db/schema/users';
import { setUserCookie } from '@/lib/auth';
import { getStravaClientId } from '@/lib/constants';
import { getGroups, validateOauthCode } from '@/lib/strava/StravaApi';
import getDatabase from '@/utils/db/getDatabase';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET({ nextUrl }: NextRequest) {
  const code = nextUrl.searchParams.get('code') || '';

  if (!code)
    return NextResponse.redirect(nextUrl.origin + '/api/strava/oauth/login');

  const validatedCode = await validateOauthCode(code);

  if (!validatedCode)
    return NextResponse.redirect(nextUrl.origin + '/api/strava/oauth/login');

  const groups = await getGroups(validatedCode.access_token);

  if (!groups)
    return NextResponse.redirect(nextUrl.origin + '/api/strava/oauth/login');

  if (!groups.find((group) => group.id.toString() === getStravaClientId()))
    return NextResponse.redirect(nextUrl.origin + '/api/strava/oauth/login');

  const db = getDatabase();

  let existingUser = await db.query.users.findFirst({
    where: eq(users.strava_id, validatedCode.athlete.id),
  });

  if (existingUser) {
    const user = await db
      .update(users)
      .set({
        refresh_token: validatedCode.refresh_token,
        access_token: validatedCode.access_token,
        updated_at: new Date(),
      })
      .returning();
  } else {
    const user = await db
      .insert(users)
      .values({
        strava_id: validatedCode.athlete.id,
        firstname: validatedCode.athlete.firstname,
        lastname: validatedCode.athlete.lastname,
        avatar: validatedCode.athlete.profile,
        refresh_token: validatedCode.refresh_token,
        access_token: validatedCode.access_token,
      })
      .returning();

    console.log(`registered ${user[0].firstname} ${user[0].lastname}`);
  }

  return setUserCookie(
    { bearer: validatedCode.access_token, expiresAt: validatedCode.expires_at },
    NextResponse.redirect(nextUrl.origin)
  );
}
