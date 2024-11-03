import { Kysely, sql } from 'kysely';
import { Database } from '@/modules/database/database.types';

export const up = async (db: Kysely<Database>) => {
  await db.schema
    .createTable('emails')
    .addColumn('id', 'varchar', (col) => col.primaryKey())
    .addColumn('campaign_id', 'varchar', (col) => col.notNull())
    .addColumn('email', 'varchar', (col) => col.notNull())
    .addColumn('is_valid_email', 'boolean', (col) =>
      col.notNull().defaultTo(true),
    )
    .addColumn('status', 'varchar', (col) => col.notNull().defaultTo('sent'))
    .addColumn('transaction_id', 'varchar')
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex('campaign_id_index')
    .on('emails')
    .column('campaign_id')
    .execute();
};

export const down = async (db: Kysely<Database>) => {
  await db.schema.dropTable('emails').execute();
};
