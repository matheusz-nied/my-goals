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
import React, { useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { Task } from "@/model/Task";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckedState } from "@radix-ui/react-checkbox";
import Link from "next/link";
import FormTask from "../components/FormTask";
import ObjectTaskContext from "@/app/tasks/interface/ObjectTaskContext";
import { TaskContext } from "@/context/task";




export default function MiniTaskPage({ params }: { params: { idTask: string } }) {
  const { status } = useSession();
  const taskContext = useContext(TaskContext) as ObjectTaskContext;

  const {tasks, setTasks} = taskContext
  console.log(tasks)

  
  if (status === "unauthenticated") {
    redirect("/api/auth/signin");
  }
  // const [miniTasks, setMiniTasks] = useState<Task[]>([]);
  // let arrayMiniTask = new Array();

  // const [checkedState, setCheckedState] = useState(new Map(arrayMiniTask));
  // miniTasks.forEach((task) => {
  //   checkedState.set(task.id, task.is_done);
  // });
  // useEffect(() => {
  //   async function getAllMiniTasks() {
  //     const res = await fetch("/api/miniTasks", {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     const body = await new Response(res.body).text();
  //     const miniTasksObject = JSON.parse(body);
  //     const miniTasks = await miniTasksObject.miniTasks;

  //     return miniTasks;
  //   }

  //   async function renderMiniTasks() {
  //     const tasks = await getAllMiniTasks();
  //     setMiniTasks(tasks);
  //   }
  //   renderMiniTasks();
  // }, []);

  // return (
    // <div className="flex flex-col gap-8 align-middle">
    //   <h1 className="my-4 text-center text-4xl font-semibold		">
    //     Suas <span className="text-primary">Mini Tasks</span>
    //   </h1>{" "}
    //   <FormTask />
    //   {miniTasks != undefined && miniTasks.length == 0 ? (
    //     <div className="flex flex-col	 items-center justify-center gap-12">
    //       <div>
    //         <Skeleton className="h-12 w-12 rounded-full" />
    //         <div className="space-y-2">
    //           <Skeleton className="h-4 w-[250px]" />
    //           <Skeleton className="h-4 w-[200px]" />
    //         </div>
    //       </div>
    //       <div>
    //         <Skeleton className="h-12 w-12 rounded-full" />
    //         <div className="space-y-2">
    //           <Skeleton className="h-4 w-[250px]" />
    //           <Skeleton className="h-4 w-[200px]" />
    //         </div>
    //       </div>
    //       <div>
    //         <Skeleton className="h-12 w-12 rounded-full" />
    //         <div className="space-y-2">
    //           <Skeleton className="h-4 w-[250px]" />
    //           <Skeleton className="h-4 w-[200px]" />
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <Table>
    //       <TableCaption>Lista das suas mini Tasks relacionada a {params.idTask}.</TableCaption>
    //       <TableHeader>
    //         <TableRow>
    //           <TableHead className="pr-2"> </TableHead>
    //           <TableHead>Meta</TableHead>
    //           <TableHead>Prioridade</TableHead>
    //           <TableHead>Mini Tasks</TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         {miniTasks.map((task: Task) => (
    //           <TableRow
    //             key={task.id}
    //             className={checkedState.get(task.id) ? "bg-muted/50" : ""}
    //           >
    //             <TableCell className="font-medium">
    //               {" "}
    //               <Checkbox
    //                 id="terms"
    //                 checked={checkedState.get(task.id) as CheckedState}
    //                 className=" rounded align-middle"
    //                 onCheckedChange={async (checked) => {
    //                   setCheckedState(
    //                     new Map(checkedState.set(task.id, !task.is_done)),
    //                   );
    //                   // console.log(checkedState.get(task.id));
    //                   task.is_done = !task.is_done;
    //                   const response = await fetch(`/api/tasks`, {
    //                     method: "PUT",
    //                     headers: {
    //                       "Content-Type": "application/json",
    //                     },
    //                     body: JSON.stringify(task),
    //                   });

    //                   if (!response.ok) {
    //                   }
    //                 }}
    //               />
    //             </TableCell>
    //             <TableCell
    //               className={checkedState.get(task.id) ? "line-through" : ""}
    //             >
    //               {task.toDo}
    //             </TableCell>
    //             <TableCell>{task.priority}</TableCell>
    //             <TableCell>
    //               <Button
    //                 variant="outline"
    //                 className="h-7 rounded pe-0 pl-2"
    //                 asChild
    //               >
    //                 <Link
    //                   href={`/miniTasks/${task.id}`}
    //                   className="text-xs opacity-60"
    //                 >
    //                   Open <ChevronRight className="" />
    //                 </Link>

                   
    //               </Button>
    //             </TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   )}
    // </div>
  // );

  return (
    <h1>{params.idTask}</h1>
  )
}
