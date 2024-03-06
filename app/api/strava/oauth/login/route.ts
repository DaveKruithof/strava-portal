import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET({ nextUrl }: NextRequest) {
  return redirect(
    'https://www.strava.com/oauth/authorize?' +
      new URLSearchParams({
        client_id: process.env.STRAVA_CLIENT_ID || '',
        redirect_uri: nextUrl.origin + '/api/strava/oauth/validate',
        response_type: 'code',
        approval_prompt: 'auto',
        scope: 'activity:read',
      }).toString()
  );
}
