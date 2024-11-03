import { Kysely, sql } from 'kysely';

export const up = async (db: Kysely<any>): Promise<void> => {
  await db.schema
    .createTable('campaigns')
    .addColumn('id', 'varchar', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('subject', 'varchar', (col) => col.notNull())
    .addColumn('mail_from', 'varchar', (col) => col.notNull())
    .addColumn('send_later', 'boolean', (col) => col.notNull())
    .addColumn('scheduled_at', 'timestamp', (col) => col.notNull())
    .addColumn('project_id', 'varchar', (col) => col.notNull())
    .addColumn('template_id', 'varchar', (col) => col.notNull())
    .addColumn('contact_list_id', 'varchar', (col) => col.notNull())
    .addColumn('status', 'varchar', (col) =>
      col
        .notNull()
        .defaultTo('draft')
        .check(
          sql`status IN ('draft', 'scheduled', 'in_progress', 'paused', 'completed', 'canceled', 'failed')`,
        ),
    )
    .addColumn('created_by', 'varchar', (col) => col.notNull())
    .addColumn('total_delivered', 'integer', (col) =>
      col.defaultTo(0).notNull(),
    )
    .addColumn('total_bounces', 'integer', (col) => col.defaultTo(0).notNull())
    .addColumn('total_opens', 'integer', (col) => col.defaultTo(0).notNull())
    .addColumn('total_clicks', 'integer', (col) => col.defaultTo(0).notNull())
    .addColumn('total_unsubscribes', 'integer', (col) =>
      col.defaultTo(0).notNull(),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex('campaign_send_date_index')
    .on('campaigns')
    .column('scheduled_at')
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable('campaigns').execute();
};
