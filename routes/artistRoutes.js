import express from 'express';
const router = express.Router();
import { createArtist, getAllArtists, getArtistById, updateArtist, deleteArtist } from '../controllers/artistController.js';
import { validateArtistInput } from '../controllers/artistValidator.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // correct path lagao
import upload from '../middleware/multer.js';


router.post('/add', verifyToken,upload.array('images',5), validateArtistInput,createArtist);
router.get('/', getAllArtists);
router.get('/:id', getArtistById);
router.put('/:id', verifyToken, upload.single('images'), updateArtist);
router.delete('/:id', verifyToken, deleteArtist);


export default router;
  