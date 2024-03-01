import { redirect } from 'next/navigation';

export async function GET() {
  return redirect(
    'https://www.strava.com/oauth/authorize?' +
      new URLSearchParams({
        client_id: process.env.STRAVA_CLIENT_ID || '',
        redirect_uri: process.env.HOST + '/api/strava/oauth/validate' || '',
        response_type: 'code',
        approval_prompt: 'auto',
        scope: 'activity:read',
      }).toString()
  );
}
