import cloudinary from '../../config/cloudinary.js';
import multer from 'multer';
import Volunteer from '../../models/Volunteer.js';

// Multer memory storage for Cloudinary uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

const volunteerUploadMiddleware = upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'galleryPhotos', maxCount: 10 }
]);

// Upload image buffer to Cloudinary
const uploadToCloudinary = (fileBuffer, fileName, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        public_id: `${folder}/${fileName}`,
        folder,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    ).end(fileBuffer);
  });
};

// Controller function
 const registerVolunteer = async (req, res) => {
  try {
    const {
      fullName, mobile, email, category,
      shift, location, experience
    } = req.body;

    // ✅ Check for duplicate email
    const existing = await Volunteer.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    let profilePhotoUrl = null;
    const galleryPhotoUrls = [];

    // ✅ Upload profile photo
    if (req.files.profilePhoto && req.files.profilePhoto[0]) {
      const profileFile = req.files.profilePhoto[0];
      profilePhotoUrl = await uploadToCloudinary(
        profileFile.buffer,
        `profile_${Date.now()}`,
        'volunteers/profile'
      );
    }

    // ✅ Upload gallery photos
    if (req.files.galleryPhotos) {
      for (const file of req.files.galleryPhotos) {
        const url = await uploadToCloudinary(
          file.buffer,
          `gallery_${Date.now()}_${Math.random()}`,
          'volunteers/gallery'
        );
        galleryPhotoUrls.push(url);
      }
    }

    // ✅ Save to MongoDB
    const newVolunteer = new Volunteer({
      fullName,
      mobile,
      email,
      category,
      shift,
      location,
      experience,
      profilePhoto: profilePhotoUrl,
      galleryPhotos: galleryPhotoUrls
    });

    await newVolunteer.save();
  console.log("✅ Saved to DB:", newVolunteer);
    return res.status(200).json({
      success: true,
      message: "Volunteer registered successfully",
      volunteer: newVolunteer
    });

  } catch (error) {
    console.error("❌ Volunteer registration failed:", error);
    return res.status(500).json({
      success: false,
      message: "Volunteer registration failed"
    });
  }
};



 const getVolunteer = async (req, res) =>
  {
      try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch volunteers" });
  }
}


// ✅ Get a single volunteer by ID
const getVolunteerById = async (req, res) => {
  try {
    const { id } = req.params;

    const volunteer = await Volunteer.findById(id);

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found"
      });
    }

    res.status(200).json(volunteer);
  } catch (err) {
    console.error("❌ Error fetching volunteer by ID:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch volunteer"
    });
  }
};



export {
  registerVolunteer,
  volunteerUploadMiddleware,
  getVolunteer,
  getVolunteerById 
};
