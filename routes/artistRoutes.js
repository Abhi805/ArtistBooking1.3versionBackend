import express from 'express';
const router = express.Router();
import { createArtist, getAllArtists, getArtistById, updateArtist, deleteArtist } from '../controllers/artistController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';

router.post('/add', protect, upload.single('image'), createArtist);
router.get('/', getAllArtists);
router.get('/:id', getArtistById);
router.put('/:id', protect, upload.single('image'), updateArtist);
router.delete('/:id', protect, deleteArtist);




export default router;
   