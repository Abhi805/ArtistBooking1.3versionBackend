import Visitor from "../models/Visitor.js";

export const trackVisitor = async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];

    const exists = await Visitor.findOne({ ip, userAgent });
    if (!exists) {
      await Visitor.create({ ip, userAgent });
    }

    const total = await Visitor.countDocuments();
    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({ message: "Failed to track visitor", error: error.message });
  }
};

export const getTotalReach = async (req, res) => {
  try {
    const total = await Visitor.countDocuments();
    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({ message: "Failed to get reach count", error: error.message });
  }
};
