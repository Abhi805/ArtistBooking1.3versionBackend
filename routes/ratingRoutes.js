import express from "express";
import { createRatingByUsername,getRatingsByUsername } from "../controllers/volunteer/ratingController.js";
import { protect, } from "../middleware/authMiddleware2.js";



const router = express.Router();

router.post("/volunteer/:username", protect,createRatingByUsername);
router.get("/volunteer/:username", getRatingsByUsername);

export default router;
 