import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('transactional_emails')
    .addColumn('id', 'varchar', (col) => col.primaryKey())
    .addColumn('to_email', 'varchar', (col) => col.notNull())
    .addColumn('from_email', 'varchar', (col) => col.notNull())
    .addColumn('reply_to', 'varchar')
    .addColumn('subject', 'varchar', (col) => col.notNull())
    .addColumn('event_name', 'varchar', (col) => col.notNull())
    .addColumn('content_html', 'text')
    .addColumn('content_text', 'text')
    .addColumn('headers', 'jsonb')
    .addColumn('project_id', 'varchar', (col) => col.notNull())
    .addColumn('template_id', 'varchar')
    .addColumn('template_data', 'jsonb')
    .addColumn('status', 'varchar', (col) =>
      col
        .notNull()
        .check(sql`status IN ('queued', 'fulfilled', 'rejected', 'bounced')`)
        .defaultTo('queued'),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('sent_at', 'timestamp')
    .execute();

  // Add indexes for common query patterns
  await db.schema
    .createIndex('transactional_emails_project_id_index')
    .on('transactional_emails')
    .column('project_id')
    .execute();

  await db.schema
    .createIndex('transactional_emails_status_index')
    .on('transactional_emails')
    .column('status')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('transactional_emails').execute();
}
