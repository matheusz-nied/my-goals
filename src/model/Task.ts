import { User } from "./User";

export interface Task {
  id?: string;
  toDo: string;
  date: Date;
  category: string;
  priority: string;
  is_done?: Boolean;
  userId?: string;
//   user?: User;
}

