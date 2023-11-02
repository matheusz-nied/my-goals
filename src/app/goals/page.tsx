"use client";

import { GetStaticProps } from "next";
import DialogForm from "./components/Form";
import { prismaClient } from "@/lib/prisma";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Goal } from "@/model/Goal";
import GoalCard from "./components/GoalCard";

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
    <div className="flex flex-col align-middle gap-8">
      <h1 className="text-4xl font-semibold text-center my-5		">
        Suas <span className="text-primary">Metas</span>
      </h1>{" "}
      <div className="flex flex-wrap gap-8 justify-center gap-x-44">
        {goals.map((goal: Goal) => {
          return <GoalCard key={goal.id} goal={goal}></GoalCard>;
        })}
      </div>
      <DialogForm />
    </div>
  );
}
