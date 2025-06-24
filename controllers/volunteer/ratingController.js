import Rating from "../../models/Rating.js";

export const createRating = async (req, res) => {
  try {
    const { artistId, stars, comment } = req.body;
    const userId = req.user._id;

    if (!artistId || !stars) {
      return res.status(400).json({ message: "Artist ID and stars are required" });
    }

    const existing = await Rating.findOne({ artistId, userId });
    if (existing) {
      return res.status(400).json({ message: "You have already rated this artist." });
    }

    const rating = new Rating({ artistId, userId, stars, comment });
    await rating.save();

    res.status(201).json({ success: true, rating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Rating failed", error: err.message });
  }
};

export const getRatingsForArtist = async (req, res) => {
  try {
    const { artistId } = req.params;

    const ratings = await Rating.find({ artistId });

    const averageRating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length
        : 0;

    res.status(200).json({
      success: true,
      ratings,
      averageRating, // 👈 VERY IMPORTANT
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch ratings" });
  }
};
