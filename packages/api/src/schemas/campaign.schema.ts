import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface CampaignTable {
  id: string;
  name: string;
  subject: string;
  mail_from: string;
  send_later: boolean;
  scheduled_at: Date;
  project_id: string;
  template_id: string;
  contact_list_id: string;
  status:
    | 'draft'
    | 'scheduled'
    | 'in_progress'
    | 'paused'
    | 'completed'
    | 'canceled'
    | 'failed';
  created_by: string;
  total_delivered: number;
  total_bounces: number;
  total_opens: number;
  total_clicks: number;
  total_unsubscribes: number;
  updated_at: ColumnType<Date, string, any>;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Campaign = Selectable<CampaignTable>;
export type NewCampaign = Insertable<CampaignTable>;
export type UpdateCampaign = Updateable<CampaignTable>;
