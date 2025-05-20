// middleware/multer.js
import multer from 'multer';

const storage = multer.memoryStorage(); // 👈 Memory storage

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
