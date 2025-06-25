import express from 'express';
import {  sendOtp,registerUser,loginUser,logoutUser } from '../../controllers/signup/signupController.js';
import { sendOTP2Factor,verifyOTP2Factor  } from '../../controllers/signup/fastSms.js';
// import bcrypt from 'bcrypt';
const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/veryfy-otp', verifyOTP2Factor);
router.post('/send', sendOTP2Factor );
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logoutUser', logoutUser);

export default router; 