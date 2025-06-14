import jwt from "jsonwebtoken";
import User from "../models/User.js";

const profileCheckMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.profileCompleted) {
      return res.status(403).json({ message: "Please complete your profile first." });
    }

    req.user = user; // store user info if needed later
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default profileCheckMiddleware;
