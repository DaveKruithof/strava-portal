import 'dotenv/config';
import getConnectionString from '@/utils/db/getConnectionString';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';

(async () => {
  try {
    const sql = neon<boolean, boolean>(getConnectionString()); // <> needed to satisfy expected drizzle type
    const db = drizzle(sql);

    await migrate(db, { migrationsFolder: 'drizzle' });
  } catch (error) {
    console.error(error);
  }

  process.exit(0);
})();
