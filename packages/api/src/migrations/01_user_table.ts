import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('id', 'varchar', (col) => col.primaryKey())
    .addColumn('first_name', 'varchar', (col) => col.notNull())
    .addColumn('last_name', 'varchar')
    .addColumn('email', 'varchar', (col) => col.notNull())
    .addColumn('password', 'varchar')
    .addColumn('img_url', 'varchar')
    .addColumn('contact', 'varchar')
    .addColumn('role_id', 'numeric', (col) => col.notNull())
    .addColumn('refresh_token', 'varchar')
    .addColumn('google_access_token', 'varchar')
    .addColumn('google_refresh_token', 'varchar')
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex('email_index')
    .on('users')
    .column('email')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('users').execute();
}
