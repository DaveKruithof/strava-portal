import { users } from '@/db/schema/users';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import getConnectionString from './getConnectionString';

export default function getDatabase() {
  const sql = neon<boolean, boolean>(getConnectionString());
  return drizzle(sql, { schema: { users } });
}
