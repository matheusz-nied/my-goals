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
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { Task } from "@/model/Task";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    paymentMethod: "Medium",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    paymentMethod: "Easy",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    paymentMethod: "Easy",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    paymentMethod: "Hard",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    paymentMethod: "Easy",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    paymentMethod: "Medium",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    paymentMethod: "Hard",
  },
];

export default function Home() {
  const { status } = useSession()

  if (status === "unauthenticated") {
    redirect('/api/auth/signin')
  }
  const [tasks, setGoals] = useState([]);

  useEffect(() => {
    async function getAllTasks() {
      const res = await fetch("/api/tasks", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const body = await new Response(res.body).text();
      const tasksObject = JSON.parse(body);
      const tasks = await tasksObject.tasks;

      return tasks;
    }

    async function renderTasks() {
      const tasks = await getAllTasks();
      setGoals(tasks);
    }
    renderTasks();
  }, [tasks]);
  return (
    <div className="flex flex-col gap-8 align-middle">
      <h1 className="my-4 text-center text-4xl font-semibold		">
        Suas <span className="text-primary">Tasks</span>
      </h1>{" "}
      <FormTask />
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
          {tasks.map((task : Task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">
                {" "}
                <Checkbox id="terms" className=" rounded align-middle" />
              </TableCell>
              <TableCell>{task.toDo}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>
                <Button variant="outline" className="h-7 rounded pe-0 pl-2">
                  {/* <ChevronRight className="h-4 w-4" /> */}
                  <span className="text-xs opacity-60">Open</span>
                  <ChevronRight className="" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
