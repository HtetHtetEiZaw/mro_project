// import fs from "fs-extra";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { prisma } from "@/utils/prismaSingleton";
import multer from 'multer';
import path from 'path';

// interface MulterRequest extends NextApiRequest {
//   name:{},
//   email:{},
//   password:{},
//   file: {
//     filename: string;
//   };
// }

// type NextApiRequest = NextApiRequestWithFile & {
//   file: Express.Multer.File;
// };

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

//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       console.log(file);
//         cb(null, path.resolve('./public/uploads'));
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().getTime() + '_' + file.originalname);
//     },
// });
// const upload = multer({ storage });

const storage =multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.resolve('./public/uploads'));
  },
  filename: function (req, file, cb) {
      cb(null, new Date().getTime() + '_' + file.originalname);
  },
});

const upload = multer({ storage });

// console.log(upload);
export const config = {
  api: {
    bodyParser: true
  }
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  try {
    // Use the Multer middleware to handle the file upload
    upload.single(req.body.imageUrl)(req, res, (error) => {
      if (error) {
        console.error(error);
        // Handle the error
        return res.status(500).json({ message: 'File upload failed' });
      }
      else{
      console.log("successs")
      }

      // File upload successful
      // Access the uploaded file using req.file
      
      // const filePath = req.file.path;
      // const createdUser =  prisma.user.create({
      //          data: {
      //           name: req.body.name,
      //           email: req.body.email,
      //           password: req.body.password,
      //           imageUrl: filePath,
      //             },
      //         });

      // Save the data to the database or perform any other necessary operations

      // Return a response
      // res.status(200).json(createdUser);
      // res.status(200).json({ message: 'File uploaded and data saved successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};


// export default handlePost;

 


  

  // const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  //   // console.log(req.body);
  //   try {
      
  //     const { name, email, password, imageUrl } = req.body;
  
  //     // Process the remaining form data and save it to the database
  //     // ...
  
  //     let imagePath = ""; // Initialize the imagePath variable
  
  //     // Handle the file upload
  //     if (imageUrl && typeof imageUrl === "object") {
  //       // Assuming the imageUrl object contains the file information
  
  //       const { name: fileName, data: fileData } = imageUrl;
       
  
  //       // Generate a unique file name
  //       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  //       const fileExtension = path.extname(fileName);
  //       const uniqueFileName = "mro" + uniqueSuffix + fileExtension;
  
  //       // Save the file to the desired directory
  //       const filePath = path.join("./public/uploads", uniqueFileName);
  //       await fs.writeFile(filePath, fileData, "binary");
  
  //       // Set the imagePath variable to the file path
  //       imagePath = filePath;
  //     }
  
  //     // Save the user data including the imagePath to the database
  //     const createdUser = await prisma.user.create({
  //       data: {
  //       //   name,
  //       //   email,
  //       //   password,
  //         ...req.body,
  //         imageUrl: imagePath,
  //       },
  //     });
  
  //     res.status(200).json({ message: "User created successfully.", user: createdUser });
  //   } catch (error) {
  //     res.status(500).json({ error: "Internal server error." });
  //   }
  // };
  