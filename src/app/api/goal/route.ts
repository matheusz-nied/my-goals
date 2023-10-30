import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

import { prismaClient } from '@/lib/prisma';
import { getSession } from 'next-auth/react';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export  async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name,category, preview_date } = req.body;

    const session = await getSession({req});
    console.log(session)
    
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
  
    return NextResponse.json(result);  }

 
}