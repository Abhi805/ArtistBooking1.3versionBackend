import express from 'express';
const router = express.Router();
import { createArtist, getAllArtists,getPendingArtists, getArtistById, updateArtist, deleteArtist,approveArtist } from '../controllers/artist/artistController.js';
import { validateArtistInput } from '../controllers/artist/artistValidator.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // correct path lagao
import upload from '../middleware/multer.js';


router.post('/add', verifyToken,upload.array('images',5), validateArtistInput,createArtist);
router.get('/', getAllArtists);
router.get('/pending', getPendingArtists);
router.patch('/:id/approve', approveArtist);
router.get('/:id', getArtistById);
router.put('/:id', verifyToken, upload.single('images'), updateArtist);
router.delete('/:id', verifyToken, deleteArtist);


export default router;
  