import express from "express";
import { setUserRole } from "../controllers/userController/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // to ensure user is logged in

const router = express.Router();

router.put("/set-role", verifyToken, setUserRole);

export default router;
