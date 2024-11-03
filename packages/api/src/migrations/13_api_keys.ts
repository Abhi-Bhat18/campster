import { Kysely, sql } from 'kysely';
import { Database } from '@/modules/database/database.types';

export const up = async (db: Kysely<Database>) => {
  await db.schema
    .createTable('api_keys')
    .addColumn('api_key', 'varchar', (col) => col.primaryKey().notNull())
    .addColumn('project_id', 'varchar', (col) => col.notNull())
    .addColumn('expires_at', 'timestamp')
    .addColumn('created_by', 'varchar', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();
};

export const down = async (db: Kysely<Database>) => {
  await db.schema.dropTable('api_keys').execute();
};
