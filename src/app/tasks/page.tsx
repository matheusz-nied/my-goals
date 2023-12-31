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
import { ChevronRight, Loader } from "lucide-react";
import FormTask from "./components/FormTask";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { Task } from "@/model/Task";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckedState } from "@radix-ui/react-checkbox";
import Link from "next/link";
import { TaskContext } from "@/context/task";
import ObjectTaskContext from "./interface/ObjectTaskContext";
import ObjectFormContext from "./interface/ObjectFormContext";
import { FormContext } from "@/context/form";

export default function TaskPage() {
  const { status } = useSession();

  if (status === "unauthenticated") {
    redirect("/api/auth/signin");
  }
  const taskContext = useContext(TaskContext) as ObjectTaskContext;
  const { tasks, setTasks } = taskContext;
  const [loading, setloading] = useState(true);

  const formContext = useContext(FormContext) as ObjectFormContext;
  const { formState, setFormState } = formContext;
  //const [tasks, setTasks] = useState<Task[]>([]);
  let arraytask = new Array();

  const [checkedState, setCheckedState] = useState(new Map(arraytask));

  tasks.forEach((task: Task) => {
    checkedState.set(task.id, task.is_done);
  });

  useEffect(() => {
    async function getAllTasks() {
      const res = await fetch("/api/tasks", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const body = await new Response(res.body).text();
      const tasksObject = JSON.parse(body);
      const tasks = await tasksObject.tasks;
      setloading(false);

      return tasks;
    }

    async function renderTasks() {
      const tasks = await getAllTasks();

      setTasks(tasks);
    }
    renderTasks();
  }, [setTasks, formState, setFormState]);
  if (loading)
    return (
      <>
        <h1 className="my-4 text-center text-4xl font-semibold		">
          Suas <span className="text-primary">Tasks</span>
        </h1>{" "}
        <div className="flex justify-end">
          <FormTask />
        </div>
        <div className="mt-10 flex flex-col	items-center justify-center gap-12">
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
      </>
    );

  return (
    <div className="flex flex-col gap-3 align-middle">
      <h1 className="my-4 text-center text-4xl font-semibold		">
        Suas <span className="text-primary">Tasks</span>
      </h1>{" "}
      <div className="flex justify-end">
        <FormTask />
      </div>
      {tasks != undefined && tasks.length == 0 ? (
        <div className="flex justify-center pt-16 align-middle italic opacity-60">
          <p>Sem tasks criadas</p>
        </div>
      ) : (
        <Table>
          <TableCaption>Lista das suas metas diárias.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="pr-2"> </TableHead>
              <TableHead>Meta</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Mini Tasks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task: Task) => (
              <TableRow
                key={task.id}
                className={checkedState.get(task.id) ? "bg-muted/50" : ""}
                // className={task.is_done ? "bg-muted/50" : ""}
              >
                <TableCell className="font-medium">
                  {" "}
                  <Checkbox
                    id="terms"
                    checked={checkedState.get(task.id) as CheckedState}
                    // checked={task.is_done}
                    className=" rounded align-middle"
                    onCheckedChange={async (checked) => {
                      setCheckedState(
                        new Map(checkedState.set(task.id, !task.is_done)),
                      );
                      task.is_done = !task.is_done;

                      const response = await fetch(`/api/tasks`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(task),
                      });
                      if (!response.ok) {
                      }
                    }}
                  />
                </TableCell>
                <TableCell
                  className={checkedState.get(task.id) ? "line-through" : ""}
                >
                  {task.toDo}
                </TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="h-7 rounded pe-0 pl-2"
                    asChild
                  >
                    <Link
                      href={`/miniTasks/${task.id}`}
                      className="text-xs opacity-60"
                    >
                      Open <ChevronRight className="" />
                    </Link>
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
