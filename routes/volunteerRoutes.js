import express from 'express';
import { registerVolunteer, volunteerUploadMiddleware,getVolunteer,getVolunteerById,updateVolunteer,getVolunteerByUserId ,getVolunteerByUsername} from '../controllers/volunteerController.js';
// import { protectedRoute } from "../controllers/protectedRoute.js";
// import { verifyToken } from "../middleware/authMiddleware.js";
import { protect } from "../middleware/authMiddleware2.js";
// import { createRating, getRatingsForArtist } from '../controllers/volunteer/ratingController.js';
// import { verifyToken } from '../middleware/authMiddleware.js';
import { getRegisteredVolunteers } from "../controllers/volunteerStatsController.js";



const router = express.Router();

router.post('/add',protect,volunteerUploadMiddleware, registerVolunteer);
router.get('/fetch',getVolunteer)
router.get('/count', getRegisteredVolunteers);
router.get("/:id", getVolunteerById); // ✅ get one by ID
router.put("/update/:id",volunteerUploadMiddleware,updateVolunteer);
router.get("/by-user/:userId", getVolunteerByUserId);
router.get('/username/:username', getVolunteerByUsername);
// router.get('/count', getRegisteredVolunteers);

export default router;
  