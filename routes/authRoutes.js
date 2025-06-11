import express from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/authController.js';
import { getProtectedData } from "../controllers/authController2.js";
import { protectedRoute } from "../controllers/protectedRoute.js";





const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser)
router.get("/protected", getProtectedData);
router.get("/check-auth", protectedRoute);

// routes/auth.js (or wherever your route is)
import User from "../models/User.js"; // adjust path as needed

router.get("/check-authb", async (req, res) => {
  try {
    const userId = req.userId; // Assuming you set this in a middleware using JWT
    if (!userId) {
      return res.json({ loggedIn: false });
    }

    const user = await User.findById(userId).select("fullName email role");
    if (!user) {
      return res.json({ loggedIn: false });
    }

    return res.json({
      loggedIn: true,
      user: {
        fullName: user.fullName,
        email: user.email,
        role: user.role, // This is what we need on the frontend
      },
    });
  } catch (error) {
    console.error("Check-auth error:", error);
    return res.status(500).json({ loggedIn: false });
  }
});






export default router;
