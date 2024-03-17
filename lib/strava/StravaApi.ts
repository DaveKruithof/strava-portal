import { Group, StravaOauth } from '.';
import { getStravaClientId, getStravaClientSceret } from '../constants';

export async function validateOauthCode(
  code: string
): Promise<StravaOauth | false> {
  const path =
    '/oauth/token?' +
    new URLSearchParams({
      client_id: getStravaClientId(),
      client_secret: getStravaClientSceret(),
      code,
      grant_type: 'authorization_code',
    });

  return request<StravaOauth>(path).catch(() => false);
}

export async function getGroups(bearer: string): Promise<Group[] | false> {
  return request<Group[]>('/api/v3/athlete/clubs', {
    method: 'GET',
    headers: { Authorization: `Bearer ${bearer}` },
  }).catch(() => false);
}

async function request<SuccessType>(
  path: string,
  options?: { method?: string; headers?: { [key: string]: string } }
): Promise<SuccessType> {
  try {
    const res = await fetch('https://www.strava.com' + path, {
      method: options?.method ?? 'POST',
      headers: options?.headers ?? {},
      next: { revalidate: 0 },
    });
    const json = await res.json();

    if (Array.isArray(json?.errors)) {
      throw new StravaApiError(res, json);
    }

    return json as SuccessType;
  } catch (error) {
    if (error instanceof StravaApiError === false) {
      console.error('unexpected strava api request error:', error);
    }

    // TODO: add retry logic

    throw error;
  }
}

class StravaApiError extends Error {
  constructor(
    public res: Response,
    public json: object
  ) {
    super();
    console.error(
      `[${res.status}][${new URL(res.url).pathname}]: ` + JSON.stringify(json)
    );
  }
}
