import { Goal } from "./Goal";

export interface User {
  id: String;
  name: String;
  email: String;
  image?: String;
  Goal?: Goal[];
  // Task     :     Task[];
}
