import jwt from "jsonwebtoken";
import User from "../models/User.js"; // ensure you import User model

const protectedRoute = async (req, res) => {
  const token = req.cookies.token;
  console.log("🔐 Cookies received:", req.cookies);

  if (!token) {
    console.log("❌ No token found.");
    return res.json({ loggedIn: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token is valid. User ID:", decoded.id);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ loggedIn: false });
    }

    res.json({
      loggedIn: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: `${user.firstName} ${user.lastName}`,
      },
    });
  } catch (err) {
    console.log("❌ Invalid token.");
    res.json({ loggedIn: false });
  }
};

export { protectedRoute };
