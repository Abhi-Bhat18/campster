import { Database } from '@/modules/database/database.types';
import { Kysely, sql } from 'kysely';

export const up = async (db: Kysely<Database>) => {
  // Then, create the junction table
  await db.schema
    .createTable('contact_list_memberships')
    .addColumn('contact_id', 'varchar', (col) => col.notNull())
    .addColumn('contact_list_id', 'varchar', (col) => col.notNull())
    .addColumn('added_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addPrimaryKeyConstraint('contact_list_membership_pkey', [
      'contact_id',
      'contact_list_id',
    ])
    .execute();

  // Create necessary indexes
  await db.schema
    .createIndex('membership_contact_id_index')
    .on('contact_list_memberships')
    .column('contact_id')
    .execute();

  await db.schema
    .createIndex('membership_list_id_index')
    .on('contact_list_memberships')
    .column('contact_list_id')
    .execute();
};

export const down = async (db: Kysely<Database>) => {
  await db.schema.dropTable('contact_list_memberships').execute();
};
