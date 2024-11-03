import { ColumnType } from 'kysely';

export interface BounceTable {
  id: string;
  contact_id: string;
  type: 'hard' | 'soft';
  mail_from: string | null;
  bounced_at: ColumnType<Date, never, never>;
}
