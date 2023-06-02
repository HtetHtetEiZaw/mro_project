import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, User } from "@prisma/client";
import { prisma } from "@/utils/prismaSingleton";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ){
    if (req.method === "GET") {
      return handleGet(req, res);
    }
  }

const handleGet =async (req: NextApiRequest, res: NextApiResponse<User>) => {
    const userId = req.query.userId as string;
    try{
        const user= await prisma.user.findUnique({
            where: { id: userId }, 
        });
        const { ...userData } = user;
        res.status(200).json(userData);
        } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).end();
        }
}
