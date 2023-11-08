import { CheckedState } from "@radix-ui/react-checkbox";
import { User } from "./User";

export interface Task {
  id?: string;
  toDo: string;
  date: Date;
  category: string;
  priority: string;
  is_done?: CheckedState;
  userId?: string;
//   user?: User;
}

