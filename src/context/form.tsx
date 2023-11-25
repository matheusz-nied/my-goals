"use client";
import { Task } from "@/model/Task";
import React, { ReactNode } from "react";
import { createContext, useState } from "react";
interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export const FormContext = createContext({});

export const FormProvider = ({ children }: Props) => {
  const [formState, setFormState] = useState<boolean>(false);

  return (
    <FormContext.Provider value={{ formState, setFormState }}>
      <div>{children}</div>
    </FormContext.Provider>
  );
};
