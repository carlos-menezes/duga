export type TLivestream = {
  num: number;
  name: string;
  stream_type: string;
  stream_id: number;
  stream_icon: string;
  epg_channel_id: string;
  added: string;
  is_adult: number;
  category_id?: string;
  category_ids: Array<number>;
  custom_sid?: string;
  tv_archive: number;
  direct_source: string;
  tv_archive_duration: number;
};
