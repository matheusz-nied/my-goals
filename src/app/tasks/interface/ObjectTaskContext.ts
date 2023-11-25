import { Task } from "@/model/Task";

export default interface ObjectTaskContext {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  }