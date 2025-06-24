import express from "express";
import { trackVisitor, getTotalReach } from "../controllers/reachController.js";

const router = express.Router();

router.post("/track", trackVisitor);
router.get("/count", getTotalReach);

export default router;
