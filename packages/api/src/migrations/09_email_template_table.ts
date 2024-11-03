import { Kysely, sql } from 'kysely';

export const up = async (db: Kysely<any>): Promise<void> => {
  await db.schema
    .createTable('email_templates')
    .addColumn('id', 'varchar', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull().unique())
    .addColumn('html', 'text', (col) => col.notNull())
    .addColumn('json', 'jsonb', (col) => col.notNull())
    .addColumn('status', 'varchar', (col) =>
      col
        .notNull()
        .defaultTo('draft')
        .check(sql`status IN ('draft', 'ready', 'archived', 'deprecated')`),
    )
    .addColumn('created_by', 'varchar', (col) => col.notNull())
    .addColumn('project_id', 'varchar', (col) => col.notNull())
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable('email_templates').execute();
};
