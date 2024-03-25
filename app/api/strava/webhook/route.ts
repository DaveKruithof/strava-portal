import { getStravaWebhookSecret } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET({ nextUrl }: NextRequest) {
  const mode = nextUrl.searchParams.get('hub.mode');
  const verifyToken = nextUrl.searchParams.get('hub.verify_token');
  const challenge = nextUrl.searchParams.get('hub.challenge');

  if (
    !mode ||
    !verifyToken ||
    !challenge ||
    verifyToken !== getStravaWebhookSecret() ||
    mode !== 'subscribe'
  ) {
    console.error(
      `strava webhook subscribe error ${mode} ${verifyToken} ${challenge}`
    );
    return NextResponse.json({ message: 'invalid request' }, { status: 400 });
  }

  return NextResponse.json({ 'hub.challenge': challenge });
}

export async function POST(req: NextRequest) {
  const payload = await req.json();
  console.log(payload);
}
