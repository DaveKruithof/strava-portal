export default function getConnectionString(): string {
  if (
    !process.env.PG_USER ||
    !process.env.PG_PASSWORD ||
    !process.env.PG_HOST ||
    !process.env.PG_DB_NAME
  )
    throw new Error('missing postgres configuration');

  return `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}/${process.env.PG_DB_NAME}`;
}
