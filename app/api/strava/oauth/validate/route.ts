import type { NextRequest } from 'next/server';

export async function GET({ nextUrl }: NextRequest) {
  const code = nextUrl.searchParams.get('code') || '';
  const data = await fetch(
    'https://www.strava.com/oauth/token?' +
      new URLSearchParams({
        client_id: process.env.STRAVA_CLIENT_ID || '',
        client_secret: process.env.STRAVA_CLIENT_SECRET || '',
        code,
        grant_type: 'authorization_code',
      }),
    {
      method: 'POST',
      next: { revalidate: 0 },
    }
  )
    .then((res) => res.json())
    .catch((e) => {
      console.error('strava oauth validation error: ' + e);
      return false;
    });

  console.log(data);
}
