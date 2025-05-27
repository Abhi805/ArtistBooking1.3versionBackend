import express from 'express';
const router = express.Router();

import { createArtist, getAllArtists, getArtistById, updateArtist, deleteArtist } from '../controllers/artistController.js';
import { validateArtistInput } from '../controllers/artistValidator.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // correct path lagao
import upload from '../middleware/multer.js';
import path from "path"


// router.post('/add', verifyToken,upload.single('images'), validateArtistInput,createArtist);
router.get('/', getAllArtists);
router.get('/:id', getArtistById);
router.put('/:id', verifyToken, upload.single('images'), updateArtist);
router.delete('/:id', verifyToken, deleteArtist);
router.post('/add',upload.single('images'), function(req,res){
    console.log("this is my file" , req.file);
    res.status(200).json({"file upload successfully" : req.file});
});


export default router;
  