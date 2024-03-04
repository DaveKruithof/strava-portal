import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  strava_id: serial('strava_id'),
  firstname: varchar('firstname', { length: 64 }),
  lastname: varchar('lastname', { length: 64 }),
  avatar: varchar('avatar', { length: 256 }),
  refresh_token: varchar('refresh_token', { length: 256 }),
  access_token: varchar('access_token', { length: 256 }),
  updated_at: timestamp('updated_at').defaultNow(),
  created_at: timestamp('created_at').defaultNow(),
});
