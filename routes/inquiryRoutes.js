import sendInquiryConfirmation from '../controllers/sendInquiryConfirmation.js';
import contactUsController from '../controllers/contactUsController.js';

import express from "express";
const router = express.Router();  

router.post('/form',sendInquiryConfirmation);
router.post('/form/contactUs',contactUsController)

export default router;