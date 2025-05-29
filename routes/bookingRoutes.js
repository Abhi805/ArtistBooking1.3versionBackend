import sendBookingConfirmation from '../controllers/bookingController.js';

import express from "express";
const router = express.Router();

router.post('/form',sendBookingConfirmation)

export default router;