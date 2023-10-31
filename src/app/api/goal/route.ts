import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

import { prismaClient } from '@/lib/prisma';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Readable } from 'stream';
export const config = {
  api: {
    bodyParser: false,
  },
};
// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export  async function POST(req: NextApiRequest, res: NextApiResponse) {

    const session = await getServerSession(authOptions);
    const body  = await new Response(req.body).text();
    const {name,category, preview_date} = JSON.parse(body);
    if (!session?.user?.email) {
      
      return NextResponse.json({ error:"Erro"});
    }
    const result = await prismaClient.goal.create({
      data: {
          name: name,
          category: category,
          preview_date:preview_date,
        user: { connect: { email: session?.user?.email } },
      },
    });
  
    return NextResponse.json(result);  

 
}