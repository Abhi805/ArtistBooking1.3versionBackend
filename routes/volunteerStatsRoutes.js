import express from 'express';
import { getRegisteredVolunteers } from '../controllers/volunteerStatsController.js';

const router = express.Router();

router.get('/registered/count', getRegisteredVolunteers);

export default router;
