import {
  getPostgresDatabaseName,
  getPostgresHost,
  getPostgresPassword,
  getPostgresUser,
} from '@/lib/constants';

export default function getConnectionString(): string {
  return `postgresql://${getPostgresUser()}:${getPostgresPassword()}@${getPostgresHost()}/${getPostgresDatabaseName()}`;
}
