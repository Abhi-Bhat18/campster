import { Kysely } from 'kysely';
import { Database } from '@/modules/database/database.types';

export const up = async (db: Kysely<Database>) => {
  await db.schema
    .createTable('email_views')
    .addColumn('project_id', 'varchar', (col) => col.notNull())
    .addColumn('campaign_id', 'varchar', (col) => col.notNull())
    .addColumn('opened_at', 'timestamp', (col) => col)
    .execute();
};

export const down = async (db: Kysely<Database>) => {
  await db.schema.dropTable('email_views').execute();
};
