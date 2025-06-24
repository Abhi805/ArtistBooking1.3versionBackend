import Volunteer from '../models/Volunteer.js';

export const registerVolunteer = async (req, res) => {
  try {
    const newVolunteer = new Volunteer(req.body);
    await newVolunteer.save();
    res.status(201).json(newVolunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVolunteer = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVolunteer = async (req, res) => {
  try {
    const updated = await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVolunteerByUserId = async (req, res) => {
  try {
    const volunteer = await Volunteer.findOne({ userId: req.params.userId });
    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVolunteerByUsername = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().populate("userId");

    const volunteer = volunteers.find(
      (v) => v.userId?.username === req.params.username
    );

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.json(volunteer);
  } catch (err) {
    console.error("Error in getVolunteerByUsername:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const volunteerUploadMiddleware = (req, res, next) => {
  // stubbed, add multer or any file handling logic if needed
  next();
};
