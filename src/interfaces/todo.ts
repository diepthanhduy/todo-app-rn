export interface ITodo {
  id: number | string;
  title: string;
  completed: boolean;
  time: Date | null;
  type?: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
