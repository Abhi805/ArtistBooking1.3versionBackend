import express from 'express';
import { registerVolunteer, volunteerUploadMiddleware,getVolunteer,getVolunteerById,updateVolunteer,getVolunteerByUserId ,getVolunteerByUsername} from '../controllers/volunteer/volunteerController.js';
// import { protectedRoute } from "../controllers/protectedRoute.js";
// import { verifyToken } from "../middleware/authMiddleware.js";
import { protect } from "../middleware/authMiddleware2.js";
import { createRating, getRatingsForArtist } from '../controllers/volunteer/ratingController.js';
import { verifyToken } from '../middleware/authMiddleware.js';



const router = express.Router();

router.post('/add',protect,volunteerUploadMiddleware, registerVolunteer);
router.get('/fetch',getVolunteer)
router.get("/:id", getVolunteerById); // ✅ get one by ID
router.put("/update/:id",volunteerUploadMiddleware,updateVolunteer);
router.get("/by-user/:userId", getVolunteerByUserId);
router.get('/username/:username', getVolunteerByUsername);

export default router;
  