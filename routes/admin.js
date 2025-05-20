import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";
import Event from "../models/Event.js";

const router = express.Router();

router.post("/create-event", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      createdBy: req.user.id,
    });

    await newEvent.save();

    res.status(201).json({ msg: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ msg: "Error creating event", error: error.message });
  }
});



export default router;
