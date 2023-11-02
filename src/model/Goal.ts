import { User } from "./User";

export interface Goal {
  id?: string;
  name: string;
  created_at: Date;
  preview_date: Date;
  current_date?: Date;
  category: string;
  userId?: string;
//   user?: User;
  urlImage?: string;
}

// '{ id: string; name: string; created_at: Date; preview_date: Date; current_date: Date | null; category: string; userId: string; }