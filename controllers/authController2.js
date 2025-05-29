
import jwt from "jsonwebtoken";

const getProtectedData = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "Access granted", user: decoded });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export { getProtectedData };


