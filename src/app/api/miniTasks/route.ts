import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Goal } from "@/model/Goal";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    console.log({ error: "Erro" });
    return NextResponse.json({ error: "Erro" });
  }
  const params = request.nextUrl.searchParams;
  const taskId = params.get("taskId");

  if (taskId === null) {
    return NextResponse.json({ error: "Params null" });
  } else {
    const miniTasks = await prismaClient.miniTask.findMany({
      where: {
        taskId: taskId,
      },
    });

    return NextResponse.json({ miniTasks: miniTasks }, { status: 200 });
  }
}
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await new Response(req.body).text();
  const { description, taskId } = JSON.parse(body);

  const result = await prismaClient.miniTask.create({
    data: {
      description: description,
      taskId: taskId,
    },
  });

  return NextResponse.json(result);
}

export async function DELETE(req: NextRequest) {
  const miniTaskId = await new Response(req.body).text();
  console.log(req.body);
  if (!miniTaskId) {
    return NextResponse.json({ error: "Id is missing" });
  }
  try {
    await prismaClient.miniTask.delete({
      where: { id: miniTaskId },
    });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erro" });
  }
}
export async function PUT(req: NextRequest) {
  const body = await new Response(req.body).text();
  const { id, description, taskId, is_done } = JSON.parse(body);
  try {
    const result = await prismaClient.miniTask.update({
      where: { id: id },
      data: {
        description: description,
        taskId: taskId,
        is_done: is_done,
      },
    });

    return NextResponse.json({ miniTask: result }, { status: 200 });
  } catch (error) {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
