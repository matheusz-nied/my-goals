"use client";
import { Task } from "@/model/Task";
import React, { ReactNode } from "react";
import { createContext, useState } from "react";
interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export const TaskContext = createContext({});

export const TaskProvider = ({ children }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <div>{children}</div>
    </TaskContext.Provider>
  );
};
