import express from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/authController.js';
import { getProtectedData, checkRoute } from "../controllers/authController2.js";

import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser)
router.get("/protected", getProtectedData);
// routes/auth.js



router.get("/check-auth", (req, res) => {
    const token = req.cookies.accessToken; // make sure this matches your cookie name

    if (!token) {
        return res.json({ loggedIn: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("dfdf",decoded)
        return res.json({ loggedIn: true, user: decoded });
       
    } catch (err) {
        return res.json({ loggedIn: false });
    }
});






export default router;
