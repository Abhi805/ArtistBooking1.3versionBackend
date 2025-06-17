import express from 'express';
import { registerVolunteer, volunteerUploadMiddleware,getVolunteer,getVolunteerById } from '../controllers/volunteer/volunteerController.js';

const router = express.Router();

router.post('/add', volunteerUploadMiddleware, registerVolunteer);
router.get('/fetch',getVolunteer)
router.get("/:id", getVolunteerById); // ✅ get one by ID
export default router;
