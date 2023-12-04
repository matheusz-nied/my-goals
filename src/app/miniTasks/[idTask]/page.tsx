"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight, Loader, Trash } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { Task } from "@/model/Task";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckedState } from "@radix-ui/react-checkbox";
import Link from "next/link";
import FormMiniTask from "../components/FormMiniTask";
import ObjectTaskContext from "@/app/tasks/interface/ObjectTaskContext";
import { TaskContext } from "@/context/task";
import { MiniTask } from "@/model/MiniTask";
import { FormContext } from "@/context/form";
import ObjectFormContext from "@/app/tasks/interface/ObjectFormContext";
import FormEditTask from "../components/FormEditTask";

export default function MiniTaskPage({
  params,
}: {
  params: { idTask: string };
}) {
  const { status } = useSession();
  if (status === "unauthenticated") {
    redirect("/api/auth/signin");
  }
  const taskContext = useContext(TaskContext) as ObjectTaskContext;
  const { tasks, setTasks } = taskContext;

  const formContext = useContext(FormContext) as ObjectFormContext;
  const { formState, setFormState } = formContext;

  const task = tasks.find((task) => {
    return task.id === params.idTask;
  });

  const [miniTasks, setMiniTasks] = useState<MiniTask[]>([]);
  let arrayMiniTasks = new Array();
  const [loading, setloading] = useState(true);

  const [checkedState, setCheckedState] = useState(new Map(arrayMiniTasks));
  miniTasks.forEach((miniTask: MiniTask) => {
    checkedState.set(miniTask.id, miniTask.is_done);
  });

  async function deleteMiniTask(id: string | undefined) {
    await fetch("/api/miniTasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });
    setFormState(!formState);
  }

  useEffect(() => {
    async function getTask() {
      if (task === undefined) {
        const res = await fetch("/api/tasks", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const body = await new Response(res.body).text();
        const tasksObject = JSON.parse(body);
        const tasks = await tasksObject.tasks;

        setTasks(tasks);
      }
    }
    getTask();

    async function getAllMiniTasks() {
      const res = await fetch(
        "/api/miniTasks?" +
          new URLSearchParams({
            taskId: params.idTask,
          }),
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );

      const body = await new Response(res.body).text();
      const miniTasksObject = JSON.parse(body);
      const miniTasks = await miniTasksObject.miniTasks;
      setloading(false);

      return miniTasks;
    }

    async function renderMiniTasks() {
      const miniTasks = await getAllMiniTasks();
      setMiniTasks(miniTasks);
    }
    renderMiniTasks();
  }, [setMiniTasks, formState, setFormState]);

  if (loading)
    return (
      <div className="flex flex-col gap-4 align-middle">
        <h1 className="my-4 text-center text-2xl font-semibold		">
          Suas tasks referente a{" "}
          <span className="text-primary">{task?.toDo}</span>
        </h1>{" "}
        <div className="flex justify-end">
        <FormEditTask  idTask={params.idTask}/>

<FormMiniTask idTask={params.idTask} />        </div>
        <div className="flex flex-col	mt-10 items-center justify-center gap-12">
          <div>
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div>
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div>
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 align-middle">
      <h1 className="my-4 text-center text-2xl font-semibold		">
        Suas tasks referente a{" "}
        <span className="text-primary">{task?.toDo}</span>
      </h1>{" "}
      <div className="flex justify-end">
        <div className="flex items-center	 gap-2  content-center	">
          <FormEditTask idTask={params.idTask} />

          <FormMiniTask idTask={params.idTask} />
        </div>
      </div>
      {miniTasks != undefined && miniTasks.length == 0 ? (
        <div className="flex justify-center pt-16 align-middle italic opacity-60">
          <p>Sem mini tasks criadas</p>
        </div>
      ) : (
        <Table>
          <TableCaption>Lista das suas metas diárias.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="pr-2"> </TableHead>
              <TableHead>Tarefas</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {miniTasks.map((miniTask: MiniTask) => (
              <TableRow
                key={miniTask.id}
                className={checkedState.get(miniTask.id) ? "bg-muted/50" : ""}
              >
                <TableCell className="font-medium">
                  {" "}
                  <Checkbox
                    id="terms"
                    checked={checkedState.get(miniTask.id) as CheckedState}
                    className=" rounded align-middle"
                    onCheckedChange={async (checked) => {
                      setCheckedState(
                        new Map(
                          checkedState.set(miniTask.id, !miniTask.is_done),
                        ),
                      );
                      miniTask.is_done = !miniTask.is_done;
                      const response = await fetch(`/api/miniTasks`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(miniTask),
                      });

                      if (!response.ok) {
                      }
                    }}
                  />
                </TableCell>
                <TableCell
                  className={
                    checkedState.get(miniTask.id) ? "line-through" : ""
                  }
                >
                  {miniTask.description}
                </TableCell>
                <TableCell className="flex justify-end">
                  <Button
                    variant="ghost"
                    onClick={() => deleteMiniTask(miniTask.id)}
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
