// controllers/artistController.js

import Artist from '../../models/Artist.js';
import cloudinary from '../../config/cloudinary.js';





 const createArtist = async (req, res) => {
  try {
    const userId = req.user.id;
    const files = req.files || [];

    if (files.length === 0) {
      return res.status(400).json({ success: false, errors: ['At least one image is required'] });
    }

    const imageUploadPromises = files.map(async (file) => {
      const fixedPath = file.path.replace(/\\/g, '/');
      const result = await cloudinary.uploader.upload(fixedPath, {
        folder: 'artist_images',
      });
      return result.secure_url;
    });

    const images = await Promise.all(imageUploadPromises);

    // Validate videoLink exists and is array in req.body here or in separate middleware

    const newArtist = new Artist({
      ...req.body,
      userId,
      images,
      isApproved: false,
    });

    await newArtist.save();

    res.status(201).json({ success: true, artist: newArtist });
    console.log("artist create successfully",newArtist);
  } catch (error) {
    console.error('Error creating artist:', error);
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

export {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
  getPendingArtists,
  approveArtist
};
