export interface ITodo {
  id: number | string;
  title: string;
  completed: boolean;
  time: Date | null;
  color?: string | null;
  image?: string | null;
  type_id?: number | string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
