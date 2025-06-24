import Volunteer from '../models/Volunteer.js';

export const getRegisteredVolunteers = async (req, res) => {
  try {
    const total = await Volunteer.countDocuments();
    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({ message: "Error counting volunteers", error: error.message });
  }
};
