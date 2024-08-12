export interface ITodoType {
  id: number | string;
  type: string;
  image: string | null;
  color_hex: string | null;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
