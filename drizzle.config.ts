import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema/*',
  out: './drizzle',
  driver: 'pg',
} satisfies Config;
