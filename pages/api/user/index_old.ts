import type { NextApiRequest, NextApiResponse } from "next";

import { User } from "@prisma/client";
import { prisma } from "@/utils/prismaSingleton";
import multer from 'multer';
import path from 'path';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "POST") {
    return handlePost(req, res);
  }
}

const storage = multer.diskStorage({
    destination: 'uploads/', // specify the directory to save the uploaded files
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExtension = path.extname(file.originalname);
      const fileName = file.fieldname + '-' + uniqueSuffix + fileExtension;
      cb(null, fileName);
    },
  });
  
  const upload = multer({ storage });
  

const handleGet = async (req: NextApiRequest, res: NextApiResponse<User[]>) => {
  const users = await prisma.user.findMany({
    include: {
      accounts: true,
      sessions: true,
    },
  });
  res.status(200).json(users);
};


// const handlePost =async (req: NextApiRequest & {file:any} , res: NextApiResponse<User>) => {
//   try {
//     const { name, email, password } = req.body;
//     const imageUrl = req.file ? req.file.path : null;

//     const createdUser = await prisma.user.create({
//     //   data: {
//     //     ...req.body,
//     //   },
//     data: {
//            name,
//            email,
//            password,
//            imageUrl
//         },
//     });
//     console.log(createdUser);
//     res.status(200).json(createdUser);
//   } catch (e) {
//     //if (e instanceof Prisma.PrismaClientKnownRequestError) {
//     res.status(500).end();
//   }
// };

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        
      await upload.single('imageUrl')(req, res, (error) => {
        if (error instanceof multer.MulterError) {
          // Handle Multer errors
          console.error(error);
          res.status(400).json({ error: 'Multer error' });
        } else if (error) {
          // Handle other errors
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          // File upload successful
          const { name, email, password } = req.body;
        //   const imageUrl = req.file ? req.file.path : null;
        //   const imageFile = req.file;
         const imageUrl = req.body.imageUrl;

              const createdUser =  prisma.user.create({
                // data: {
                //   ...req.body,
                // },
                data: {
                    name,
                    email,
                    password,
                    imageUrl,
                  },
              });
            
              res.status(200).json(createdUser);
             
        //   res.status(200).json({ success: true });
        }
      });
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

