import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
  return NextResponse.json({goals: goals}, {status: 200});
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
      urlImage: urlImage
    },
  });

  return NextResponse.json("result");
}
