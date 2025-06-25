// controllers/ratingController.js
import User from "../../models/User.js";
import Rating from "../../models/Rating.js";


export const createRatingByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const { stars, comment } = req.body;
    const userId = req.user._id; // assuming JWT middleware sets this

    // Find volunteer by username
    const volunteer = await User.findOne({ username, role: "volunteer" });
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    // Check for existing rating
    const existing = await Rating.findOne({ artistId: volunteer._id, userId });
    if (existing) {
      return res.status(400).json({ message: "You have already rated this volunteer." });
    }

    const rating = new Rating({
      artistId: volunteer._id,
      userId,
      stars,
      comment,
    });

    await rating.save();
    res.status(201).json({ success: true, rating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Rating failed", error: err.message });
  }
};


export const getRatingsByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const artist = await User.findOne({ username });
    if (!artist) return res.status(404).json({ message: "Artist not found" });

    const ratings = await Rating.find({ artistId: artist._id });

    const averageRating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length
        : 0;

    res.status(200).json({
      success: true,
      ratings,
      averageRating,
    });
  } catch (err) {
    console.error("Fetch Rating Error:", err);
    res.status(500).json({ message: "Failed to fetch ratings" });
  }
};
