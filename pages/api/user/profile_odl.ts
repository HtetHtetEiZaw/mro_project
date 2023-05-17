import type { NextApiRequest, NextApiResponse } from "next";

import { User } from "@prisma/client";
import { prisma } from "@/utils/prismaSingleton";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return handleGet(req, res);
  } else {
    return res.status(500).end();
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