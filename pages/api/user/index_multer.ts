import type { NextApiRequest , NextApiResponse } from "next";
import { User } from "@prisma/client";
import { prisma } from "@/utils/prismaSingleton";
import multer,{ FileFilterCallback } from 'multer';
import path from 'path';


// type NextApiRequest = NextApiRequestWithFile & {
//   file: Express.Multer.File;
// };

interface MulterRequest extends NextApiRequest {
  file: {
    filename: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return handleGet(req, res);
  }
   else if (req.method === "POST") {
    return handlePost(req as any,res);
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


// export const config = {
//     api: {
//       bodyParser: false
//     }
//   }

  const upload=multer({
  storage:multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,path.join(process.cwd(),"./public","/uploads"));
    },
    filename:function(req,file,cb){
      cb(null,new Date().getTime()+"_"+file.originalname);
    },
  }),
});

const handlePost = async ( req: MulterRequest,res: NextApiResponse,) => {
    try {
      await upload.single('imageUrl')(req, res, (error) => {
        console.log(req.file);

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
          // const { name, email, password } = req.body;
          //   const imageUrl = req.file ? req.file.path : null;
          const imageUrl = req.file;
          // const imagePath =req.file.path;
              const createdUser =  prisma.user.create({
                data: {
                  ...req.body,imageUrl
                },
                // data: {
                //     name,
                //     email,
                //     password,
                //     imageUrl,
                //   },
              });
              // res.status(201).json({body:req.body,file:req.file});
              res.status(200).json(createdUser);
             
        //   res.status(200).json({ success: true });
        }
      });
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };



// const handlePost = async (req: MulterRequest, res: NextApiResponse<User>) => {
//   try {
//     const { name, email, password } = req.body;

//     await upload.single("imageUrl")((req as any) as multer.Request, res, (error: any) => {
//       if (error) {
//         // res.status(400).send("Error uploading image file.");
//         return;
//       }
//      console.log(req.file);
//       const imagePath =req.file.filename ;

//       // if (!imagePath) {
//       //   // res.status(400).send("Image file is required.");
//       //   return;
//       // }

//       const createdUser =  prisma.user.create({
//         data: {
//           name,
//           email,
//           password,
//           imageUrl: imagePath,
//         },
//       });
//       res.status(200).json(createdUser);
//     });
//   } catch (e) {
//     res.status(500).end();
//   }
// };


  // const storage = multer.diskStorage({
  //   destination: './public/uploads',
  //   filename: (req, file, cb) => {
  //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  //     const fileExtension = path.extname(file.originalname);
  //     const fileName = file.fieldname + '-' + uniqueSuffix + fileExtension;
  //     cb(null, fileName);
  //   },
  // });
  
  // const upload = multer({storage});
  


// const handlePost = async (req: MulterRequest, res: NextApiResponse<User>) => {
//   try {
//     const { name, email, password } = req.body;

//     upload.single("imageUrl")(req as any, res as any, (error: any) => {
//       if (error) {
//          console.error(error);
//         //  res.status(500).send('An error occurred during file upload.');
//         }

//       const imagePath = req.file.filename;

//       if (!imagePath) {
//         // res.status(400).send("Image file is required.");
//         return;
//       }

//       const createdUser = prisma.user.create({
//         data: {
//           name,
//           email,
//           password,
//           imageUrl: imagePath,
//         },
//       });

//       res.status(200).json(createdUser);
//     });
//   } catch (e) {
//     res.status(500).end();
//   }
// };

// const handlePost =  async(req: NextApiRequest, res: NextApiResponse<User>) => {
//   upload.single('imageUrl')
//   try {
//     // const { name, email, password} = req.body;
//     const imageUrl = req.file.path;
//     const createdUser = await prisma.user.create({
//       data: {
//         ...req.body,imageUrl
//       },
//         // data: {
//         //         name,
//         //         email,
//         //         password,
//         //         imageUrl:imagePath,
//         //     },
//     });
//     res.status(200).json(createdUser);
//   } catch (e) {
//     //if (e instanceof Prisma.PrismaClientKnownRequestError) {
//     res.status(500).end();
//   }
// };



  // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //   if (req.method === 'POST') {
  //     upload.single('imageUrl')(req as Request, res, async (error: any) => {
  //       if (error) {
  //         console.error(error);
  //         res.status(500).send('An error occurred during file upload.');
  //       } else {
  //         // Access the uploaded file via req.file
  //         if (req.file) {
  //           // Save the file path to the database
  //           const filePath = req.file.path;
  //           const createdUser = await prisma.user.create({
  //             data: {
  //               name: req.body.name,
  //               email: req.body.email,
  //               password: req.body.password,
  //               imageUrl: filePath, // Save the file path as a string
  //             },
  //           });
  //           res.status(200).json(createdUser);
  //         } else {
  //           res.status(400).send('No file uploaded.');
  //         }
  //       }
  //     });
  //   } else {
  //     res.status(405).send('Method Not Allowed');
  //   }
  // }

  // const handlePost = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  //   try {
  //     const { name, email, password } = req.body;
  //     const imagePath = req.file?.path; // Access the file path using req.file
  
  //     if (!imagePath) {
  //       // res.status(400).send("Image file is required.");
  //       return;
  //     }
  
  //     const createdUser = await prisma.user.create({
  //       data: {
  //         name,
  //         email,
  //         password,
  //         imageUrl: imagePath, // Save the image file path in the database
  //       },
  //     });
  
  //     res.status(200).json(createdUser);
  //   } catch (e) {
  //     res.status(500).end();
  //   }
  // };
  