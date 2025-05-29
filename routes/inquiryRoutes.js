import sendInquiryConfirmation from '../controllers/sendInquiryConfirmation.js';

import express from "express";
const router = express.Router();  

router.post('/form',sendInquiryConfirmation);

export default router;