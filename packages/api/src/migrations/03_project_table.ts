import { Kysely, sql } from 'kysely';

export const up = async (db: Kysely<any>): Promise<void> => {
  await db.schema
    .createTable('projects')
    .addColumn('id', 'varchar', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('description', 'varchar', (col) => col.notNull())
    .addColumn('status', 'varchar', (col) => col.notNull().defaultTo('active'))
    .addColumn('domail', 'varchar', (col) => col.notNull())
    .addColumn('default_mail_from', 'varchar', (col) => col.notNull())
    .addColumn('created_by', 'varchar', (col) => col.notNull())
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex('ower_index')
    .on('projects')
    .column('created_by')
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable('projects').execute();
};
