// controllers/artistController.js

import Artist from '../models/artist.js';

// Create Artist
const createArtist = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('Body:', req.body);
    console.log('Files:', req.files);

    const images = [];

    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        images.push({
          data: file.buffer,
          contentType: file.mimetype
        });
      });
    }

    const newArtist = new Artist({
      ...req.body,
      userId,
      images,
      isApproved: false
    });
 
    await newArtist.save();
    console.log("user create successfully");
    res.status(201).json({ success: true, artist: newArtist });

  } catch (error) {
    console.error("Error creating artist:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};



// Get all Artists
const getAllArtists = async (req, res) => {
  try { 
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Artist by ID
const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ message: 'Artist not found' });
        // Check if artist and images exist
    if (artist && artist.images && artist.images.length > 0) {
      artist.images = artist.images.map((img) => {
        return `data:${img.contentType};base64,${img.data.toString("base64")}`;
      });
    }
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

// ✅ Export all
export {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist
};
