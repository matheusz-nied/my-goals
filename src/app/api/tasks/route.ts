import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Goal } from "@/model/Goal";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    console.log({ error: "Erro" });
    return NextResponse.json({ error: "Erro" });
  }
  const tasks = await prismaClient.task.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
  });
  return NextResponse.json({ tasks: tasks }, { status: 200 });
}
export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  const body = await new Response(req.body).text();
  const { toDo, category, date, priority } = JSON.parse(body);
  if (!session?.user?.email) {
    console.log({ error: "Erro" });
    return NextResponse.json({ error: "Erro" });
  }
  const email = session.user.email; // we know email is defined here because of the check above

  const result = await prismaClient.task.create({
    data: {
      toDo: toDo,
      category: category,
      date: date,
      priority: priority,
      user: { connect: { email: email } },
    },
  });

  return NextResponse.json(result);
}

export async function DELETE(req: NextRequest) {
  let taskId = await new Response(req.body).text();
  taskId = taskId.substring(0, taskId.length - 1);
  taskId = taskId.substring(1);

  if (!taskId) {
    return NextResponse.json({ error: "Id is missing" });
  }
  console.log(taskId)
  try {
        
    await prismaClient.miniTask.deleteMany({
      where: { taskId: taskId },
    });
    await prismaClient.task.delete({
      where: { id: taskId },
    });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erro" });
  }
}
export async function PUT(req: NextRequest) {
  const body = await new Response(req.body).text();
  const { id, toDo, category, date, priority,is_done } = JSON.parse(body);
  try {
    const task = await prismaClient.task.update({
      where: { id: id },
      data: {
        toDo: toDo,
        category: category,
        date: date,
        priority: priority,
        is_done: is_done
      },
    });

    return NextResponse.json({ task: task }, { status: 200 });
  } catch (error) {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
