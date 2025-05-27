// // middleware/multer.js
// import multer from 'multer';

// const storage = multer.memoryStorage(); // 👈 Memory storage

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed!'), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// export default upload;



// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../config/cloudinary.js';

// let storage;

// try {
//   if (!cloudinary) {
//     throw new Error("Cloudinary not configured correctly.");
//   }

//   storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'gnv-artists',
//       allowed_formats: ['jpg', 'png', 'jpeg'],
//     },
//   });

//   console.log("✅ Multer + Cloudinary storage initialized upl");

// } catch (error) {
//   console.error("❌ Error initializing Cloudinary storage:", error.message);
// }

// const upload = multer({ storage });

// export default upload;

import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, '/tmp/my-uploads')
  // },
  destination:'./public/uploads',
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage })

export default upload;