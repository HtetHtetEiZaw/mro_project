import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { prisma } from "@/utils/prismaSingleton";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === "GET") {
      return handleGet(req, res);
    }
     else if (req.method === "POST") {
      return handlePost(req,res);
    }
  }

  const handleGet = async (req: NextApiRequest, res: NextApiResponse<User[]>) => {
    const users = await prisma.user.findMany({
      include: {
        accounts: true,
        sessions: true,
      },
    });
    res.status(200).json(users);
  };
 
  const handlePost =async (req: NextApiRequest , res: NextApiResponse<User>) => {
  try {
    const createdUser = await prisma.user.create({
      data: {
        ...req.body,
      },
    });
    res.status(200).json(createdUser);
  } catch (e) {
    //if (e instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(500).end();
  }
};



 


  

