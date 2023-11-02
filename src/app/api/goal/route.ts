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
  const goals = await prismaClient.goal.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
  });
  return NextResponse.json({ goals: goals }, { status: 200 });
}
export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  const body = await new Response(req.body).text();
  const { name, category, preview_date, urlImage } = JSON.parse(body);
  if (!session?.user?.email) {
    console.log({ error: "Erro" });
    return NextResponse.json({ error: "Erro" });
  }
  const email = session.user.email; // we know email is defined here because of the check above

  const result = await prismaClient.goal.create({
    data: {
      name: name,
      category: category,
      preview_date: preview_date,
      current_date: preview_date,
      user: { connect: { email: email } },
      urlImage: urlImage,
    },
  });

  return NextResponse.json(result);
}


export async function DELETE(req: NextRequest) {
  const goalId = await new Response(req.body).text();
  if(!goalId) {
    return NextResponse.json({ error: "Id is missing" });

  }
  try {
    const goal = await prismaClient.goal.delete({
      where: { id: goalId },
    });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Erro" });

  }
}
// export async function PUT(req: NextRequest) {
//   const body = await new Response(req.body).text();

//   const { goalId, name, category, urlImage } = JSON.parse(body);
//   try {
//     const goal = await prismaClient.goal.update({
//       where: { id: goalId },
//       data: {
//         name: name,
//         category: category,
//         urlImage: urlImage,
//       },
//     });
//     return NextResponse.json({ goal: goal }, { status: 200 });
//   } catch (error) {
//     throw new Error(
//       `The HTTP ${req.method} method is not supported at this route.`,
//     );
//   }
// }