"use client";

import { GetStaticProps } from "next";
import DialogForm from "./components/Form";
import { prismaClient } from "@/lib/prisma";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Goal } from "@/model/Goal";
import GoalCard from "./components/GoalCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [goals, setGoals] = useState([]);


  useEffect(() => {
    async function getAllGoals() {
      const res = await fetch("/api/goal", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const body = await new Response(res.body).text();
      const goalsObject = JSON.parse(body);
      const goals = await goalsObject.goals;

      return goals;
    }

    async function renderGoals() {
      const goals = await getAllGoals();
      setGoals(goals);
    }
   
    renderGoals();
  }, [goals]);
  
  return (
    <div className="flex flex-col gap-8 align-middle">
      <h1 className="my-4 text-center text-4xl font-semibold		">
        Suas <span className="text-primary">Metas</span>
      </h1>{" "}
      <DialogForm />
      <div className="flex flex-wrap justify-center gap-8 gap-x-44">
        {goals != undefined && goals.length == 0   ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          
          goals != undefined ? (goals.map((goal: Goal) => {
            return <GoalCard key={goal.id} goal={goal}></GoalCard>;
          })):( <span className="text-primary"></span>)



        )}
      </div>
    </div>
  );
}
