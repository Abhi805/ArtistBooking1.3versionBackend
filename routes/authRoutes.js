import express from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/authController.js';
import { getProtectedData } from "../controllers/authController2.js";
import { protectedRoute } from "../controllers/protectedRoute.js";
import profileCheckMiddleware from "../middleware/profileCheckMiddleware.js";



const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser)
router.get("/protected", getProtectedData);
router.get("/check-auth", protectedRoute);
router.get("/profile",profileCheckMiddleware);

export default router;
