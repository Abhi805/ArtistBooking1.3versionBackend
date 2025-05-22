import express from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/authController.js';
import { getProtectedData } from "../controllers/authController2.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser)
router.get("/protected", getProtectedData);




export default router;
