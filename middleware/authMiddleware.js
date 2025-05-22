// import jwt from "jsonwebtoken";
// import User from "../models/User.js"; // ❗Add this at the top of your authMiddleware.js


// export const verifyAdmin = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ msg: "Access denied. Admins only." });
//   }
//   next();
// };

// export const verifyToken = (req, res, next) => {
  
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token)
//     return res.status(401).json({ msg: "Access token required" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach user data to request
//     next(); 
//   } catch (error) {
//     res.status(403).json({ msg: "Invalid or expired token" });
//   }
// };



// export const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       console.log('🟡 Token received:', token);

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       // console.log('🟢 Decoded Token:', decoded);

//       req.user = await User.findById(decoded.id).select('-password');
//       // console.log('🔵 User from DB:', req.user);

//       if (!req.user) {
//         return res.status(401).json({ message: 'User not found' });
//       }

//       next();
//     } catch (error) {
//       // console.error('🔴 Token error:', error);
//       return res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   } else {
//     return res.status(401).json({ message: 'Not authorized, no token    vhyugghfg' });
//   }    
// };


import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🛡️ Middleware to verify JWT token from cookies
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

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
