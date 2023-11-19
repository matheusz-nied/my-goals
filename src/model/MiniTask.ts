import { CheckedState } from "@radix-ui/react-checkbox";

export interface MiniTask {
  id?: string;
  description: string;
  taskId: string;
  is_done?: CheckedState;

}

