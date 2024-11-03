import { Kysely, sql } from 'kysely';

export const up = async (db: Kysely<any>): Promise<void> => {
  await db.schema
    .createTable('contact_lists')
    .addColumn('id', 'varchar', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('description', 'varchar', (col) => col.notNull())
    .addColumn('email_type', 'varchar', (col) =>
      col.notNull().check(sql`email_type IN ('public', 'private')`),
    )
    .addColumn('email_opt_in', 'varchar', (col) =>
      col.notNull().check(sql`email_opt_in IN ('single', 'double')`),
    )
    .addColumn('project_id', 'varchar', (col) => col.notNull())
    .addColumn('status', 'varchar', (col) =>
      col
        .notNull()
        .defaultTo('active')
        .check(sql`status IN ('active', 'archive')`),
    )
    .addColumn('created_by', 'varchar', (col) => col.notNull())
    .addColumn('total_contacts', 'numeric', (col) => col.notNull().defaultTo(0))
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  // Create indexes for better query performance
  await db.schema
    .createIndex('contact_list_name_index')
    .on('contact_lists')
    .column('name')
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable('contact_lists').execute();
};
