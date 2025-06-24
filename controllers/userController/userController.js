import User from "../../models/User.js";

export const setUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    // Validate input
    if (!["volunteer", "unassigned","user"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role selected." });
    }

    // req.user.id comes from the verified token (middleware)
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { role },
      { new: true }  
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("Error setting role:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
 