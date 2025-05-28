

import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🛡️ Middleware to verify JWT token from cookies
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("token is verifyed",token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user; // Attach user to request
  console.log("✅ Validation passed, going to next middleware",req.user );

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

// 🛡️ Middleware to allow only admin users
export const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }
  next();
};
