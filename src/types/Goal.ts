import { User } from "./User";

export interface Goal {
  id?: String;
  name: String;
  created_at: Date;
  preview_date: Date;
  current_date?: Date;
  category: String;
  userId?: String;
  user?: User;
  urlImage?: String;
}
