import { Kysely, sql } from 'kysely';

export const up = async (db: Kysely<any>): Promise<void> => {
  // First, create the contacts table without the contact_list_id
  await db.schema
    .createTable('contacts')
    .addColumn('id', 'varchar', (col) => col.primaryKey())
    .addColumn('first_name', 'varchar', (col) => col.notNull())
    .addColumn('last_name', 'varchar', (col) => col.notNull())
    .addColumn('email', 'varchar', (col) => col.notNull().unique())
    .addColumn('contact', 'varchar', (col) => col.notNull())
    .addColumn('attributes', 'jsonb', (col) => col.notNull().defaultTo('{}'))
    .addColumn('opt_in', 'boolean', (col) => col.notNull().defaultTo(false))
    .addColumn('unsubscribed', 'boolean', (col) =>
      col.notNull().defaultTo(false),
    )
    .addColumn('is_valid_email', 'boolean', (col) =>
      col.notNull().defaultTo(true),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable('contacts').execute();
};
