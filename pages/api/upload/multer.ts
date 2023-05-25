import multer ,{ MulterError } from 'multer';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
export const config = {
  api: {
    bodyParser: false
  }
}
interface MulterRequest extends NextApiRequest {
    file: {
      filename: string;
    };
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '_' + file.originalname);
    },
});
const upload = multer({ storage });
const uploadHandler = async (req: MulterRequest , res: NextApiResponse) => {
    try {
        await upload.single('fileInput')(req, res, (err: MulterError) => {
            if (err) {
                throw err;
            }
            const { filename }  = req.file;
            return res.status(200).json({ message: 'Image uploaded successfully' ,filename:  filename });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Image upload failed' });
    }
};
export default uploadHandler;