export interface Document {
  id: number;
  name: string;
  file_size: number;
  owner_name: string;
  folder_id?: number;
  created_at: number;
}
