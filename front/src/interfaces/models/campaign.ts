export type Sources = 'facebook' | 'instagram' | 'whatsapp' | 'google' | 'tiktok' | 'youtube' | 'twitter' | 'others';

export interface ICampaign {
  id: number;
  source_id: Sources;
  name: string;
  link?: string;
  investment: number;
  revenues: number;
  startDate: Date;
  endDate: Date;
}
