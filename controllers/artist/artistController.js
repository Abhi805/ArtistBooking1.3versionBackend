



import Artist from '../../models/Artist.js';
import User from '../../models/User.js'; // ✅ Add this
import cloudinary from '../../config/cloudinary.js';


import Review from "../../models/Review.js";


const createArtist = async (req, res) => {
  try {
    const userId = req.user.id;
    const files = req.files || {};

    // ✅ Check for duplicate artist profile
    const existingProfile = await Artist.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ success: false, message: 'Artist profile already exists for this user.' });
    }

    const galleryImages = files.images || [];
    const profileImageFile = files.profileImage?.[0];

    // ✅ Ensure at least one gallery image is uploaded
    if (galleryImages.length === 0) {
      return res.status(400).json({ success: false, errors: ['At least one gallery image is required'] });
    }

    // ✅ Upload gallery images to Cloudinary
    const imageUploadPromises = galleryImages.map(async (file) => {
      const fixedPath = file.path.replace(/\\/g, '/');
      const result = await cloudinary.uploader.upload(fixedPath, {
        folder: 'artist_images',
      });
      return result.secure_url;
    });
    const images = await Promise.all(imageUploadPromises);

    // ✅ Upload profile image to Cloudinary (if present)
    let profileImage = '';
    if (profileImageFile) {
      const fixedPath = profileImageFile.path.replace(/\\/g, '/');
      const result = await cloudinary.uploader.upload(fixedPath, {
        folder: 'artist_profile_photos',
      });
      profileImage = result.secure_url;
    }

    // ✅ Create artist document
    const newArtist = new Artist({
      ...req.body,
      userId,
      images,
      profileImage,
      isApproved: false,
    });

    await newArtist.save();

    // ✅ Mark user as profile completed
    await User.findByIdAndUpdate(userId, { profileCompleted: true });

    res.status(201).json({ success: true, artist: newArtist });
    console.log("✅ Artist created and user profile marked as complete:", newArtist);
  } catch (error) {
    console.error('❌ Error creating artist:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};




// Get all Artists
const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find({ isApproved: true });
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all artists pending approval
const getPendingArtists = async (req, res) => {
  try {
    const pendingArtists = await Artist.find({ isApproved: false });
    res.status(200).json(pendingArtists);
    console.log("fddfds")
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//approve artist
const approveArtist = async (req, res) => {
  try {
    const artistId = req.params.id;

    // Update isApproved to true
    const artist = await Artist.findByIdAndUpdate(
      artistId,
      { isApproved: true },
      { new: true }
    );

    if (!artist) return res.status(404).json({ message: 'Artist not found' });

    res.status(200).json({ message: 'Artist approved', artist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get Artist by ID
const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });
    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






// Update Artist
const updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });

    if (artist.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedData = req.body;
    if (req.file) updatedData.image = req.file.filename;

    const updated = await Artist.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Artist
const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });

    if (artist.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Artist.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Artist deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// POST /api/reviews/:artistId
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.user.id;
    const { artistId } = req.params;


    // Check for duplicate review
    const existingReview = await Review.findOne({ user: userId, artist: artistId });
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this artist." });
    }

    // Create review
    const review = await Review.create({ artist: artistId, user: userId, rating, comment });

    // Recalculate artist rating and review count
    const reviews = await Review.find({ artist: artistId });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Artist.findByIdAndUpdate(artistId, {
      rating: avgRating,
      reviews: reviews.length,
    });

    res.status(201).json({ message: "Review added", review });
  } catch (error) {
    console.error("Error in addReview:", error);
    res.status(500).json({ message: "Failed to add review", error: error.message });
  }
};

// GET /api/reviews/:artistId
const getReviewsByArtist = async (req, res) => {
  try {
    const { artistId } = req.params;

    const reviews = await Review.find({ artist: artistId }).populate({ path: "user", model: "UserLoginSingup", select: "firstName" })
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
};




export {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
  getPendingArtists,
  approveArtist,
  getReviewsByArtist,
  addReview
};
