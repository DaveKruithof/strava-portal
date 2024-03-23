const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_CLUB_ID = process.env.STRAVA_CLUB_ID;
const STRAVA_WEBHOOK_SECRET = process.env.STRAVA_WEBHOOK_SECRET;
const PG_USER = process.env.PG_USER;
const PG_PASSWORD = process.env.PG_PASSWORD;
const PG_HOST = process.env.PG_HOST;
const PG_DB_NAME = process.env.PG_DB_NAME;
const JWT_SECRET = process.env.JWT_SECRET;
const URL = process.env.URL;

export function getStravaClientId(): string {
  if (!STRAVA_CLIENT_ID || STRAVA_CLIENT_ID.length === 0) {
    throw new Error('env STRAVA_CLIENT_ID not set');
  }

  return STRAVA_CLIENT_ID;
}

export function getStravaClientSceret(): string {
  if (!STRAVA_CLIENT_SECRET || STRAVA_CLIENT_SECRET.length === 0) {
    throw new Error('env STRAVA_CLIENT_SECRET not set');
  }

  return STRAVA_CLIENT_SECRET;
}

export function getStravaClubId(): string {
  if (!STRAVA_CLUB_ID || STRAVA_CLUB_ID.length === 0) {
    throw new Error('env STRAVA_CLUB_ID not set');
  }

  return STRAVA_CLUB_ID;
}

export function getStravaWebhookSecret(): string {
  if (!STRAVA_WEBHOOK_SECRET || STRAVA_WEBHOOK_SECRET.length === 0) {
    throw new Error('env STRAVA_WEBHOOK_SECRET not set');
  }

  return STRAVA_WEBHOOK_SECRET;
}

export function getPostgresUser(): string {
  if (!PG_USER || PG_USER.length === 0) {
    throw new Error('env PG_USER not set');
  }

  return PG_USER;
}

export function getPostgresPassword(): string {
  if (!PG_PASSWORD || PG_PASSWORD.length === 0) {
    throw new Error('env PG_PASSWORD not set');
  }

  return PG_PASSWORD;
}

export function getPostgresHost(): string {
  if (!PG_HOST || PG_HOST.length === 0) {
    throw new Error('env PG_HOST not set');
  }

  return PG_HOST;
}

export function getPostgresDatabaseName(): string {
  if (!PG_DB_NAME || PG_DB_NAME.length === 0) {
    throw new Error('env PG_DB_NAME not set');
  }

  return PG_DB_NAME;
}

export function getJwtSecret(): string {
  if (!JWT_SECRET || JWT_SECRET.length === 0) {
    throw new Error('env JWT_SECRET not set');
  }

  return JWT_SECRET;
}

export function getUrl(): string {
  if (!URL || URL.length === 0) {
    throw new Error('env URL not set');
  }

  return URL;
}

export const USER_COOKIE_NAME = 'user';

export const STRAVA_OAUTH_LOGIN_PATH = '/api/strava/oauth/login';
