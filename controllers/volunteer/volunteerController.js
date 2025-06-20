


import cloudinary from "../../config/cloudinary.js";
import multer from "multer";
import Volunteer from "../../models/Volunteer.js";

// Multer memory storage for Cloudinary uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

const volunteerUploadMiddleware = upload.fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "galleryPhotos", maxCount: 10 },
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

// Register a new volunteer with file uploads
const registerVolunteer = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ from JWT
    const {
      fullName,
      email,
      mobile,
      dob,
      category,
      location,
      shift,
      experience,
      awards,
      education,
      summary,
    } = req.body;

    // Parse JSON string fields from form-data
    const skills = JSON.parse(req.body.skills || "[]");
    const experienceDetails = JSON.parse(req.body.experienceDetails || "[]");
    const exhibitions = JSON.parse(req.body.exhibitions || "[]");

    let profilePhotoUrl = null;
    const galleryPhotoUrls = [];

    if (req.files.profilePhoto && req.files.profilePhoto[0]) {
      const profileFile = req.files.profilePhoto[0];
      profilePhotoUrl = await uploadToCloudinary(
        profileFile.buffer,
        `profile_${Date.now()}`,
        "volunteers/profile"
      );
    }

    if (req.files.galleryPhotos) {
      for (const file of req.files.galleryPhotos) {
        const url = await uploadToCloudinary(
          file.buffer,
          `gallery_${Date.now()}_${Math.random()}`,
          "volunteers/gallery"
        );
        galleryPhotoUrls.push(url);
      }
    }
    // Continue with rest of logic...
    const newVolunteer = new Volunteer({
        userId, // ✅ yeh jaroori hai

      fullName,
      email,
      mobile,
      dob,
      category,
      location,
      shift,
      experience,
      awards,
      education,
      summary,
      profilePhoto: profilePhotoUrl,         // ✅ fixed
      galleryPhotos: galleryPhotoUrls,       // ✅ fixed
      skills,
      experienceDetails,
      exhibitions,
    });


    await newVolunteer.save();
    console.log("✅ Saved to DB:", newVolunteer);

    return res.status(200).json({
      success: true,
      message: "Volunteer registered successfully",
      volunteer: newVolunteer,
    });
  } catch (error) {
    console.error("❌ Volunteer registration failed:", error);
    return res.status(500).json({
      success: false,
      message: "Volunteer registration failed",
    });
  }
};

// Get all volunteers
const getVolunteer = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.status(200).json(volunteers);
  } catch (err) {
    console.error("❌ Error fetching volunteers:", err);
    res.status(500).json({ message: "Failed to fetch volunteers" });
  }
};

// Get volunteer by ID
const getVolunteerById = async (req, res) => {
  try {
    const { id } = req.params;
    const volunteer = await Volunteer.findById(id);
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found",
      });
    }
    res.status(200).json(volunteer);
  } catch (err) {
    console.error("❌ Error fetching volunteer by ID:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch volunteer",
    });
  }
};

export const getVolunteerByUsername = async (req, res) => {
  try {
    const volunteer = await Volunteer.findOne({ username: req.params.username });
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
    res.json(volunteer);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};






//update volunteer
const updateVolunteer = async (req, res) => {
  try {
    const { id } = req.params;
    const volunteer = await Volunteer.findById(id);
    if (!volunteer) {
      return res.status(404).json({ success: false, message: "Volunteer not found" });
    }

    const {
      fullName,
      email,
      mobile,
      dob,
      category,
      location,
      shift,
      experience,
      awards,
      education,
      summary,
    } = req.body;

    const skills = JSON.parse(req.body.skills || "[]");
    const experienceDetails = JSON.parse(req.body.experienceDetails || "[]");
    const exhibitions = JSON.parse(req.body.exhibitions || "[]");

    if (fullName) volunteer.fullName = fullName;
    if (email) volunteer.email = email;
    if (mobile) volunteer.mobile = mobile;
    if (dob) volunteer.dob = dob;
    if (category) volunteer.category = category;
    if (location) volunteer.location = location;
    if (shift) volunteer.shift = shift;
    if (experience) volunteer.experience = experience;
    if (awards) volunteer.awards = awards;
    if (education) volunteer.education = education;
    if (summary) volunteer.summary = summary;

    volunteer.skills = skills;
    volunteer.experienceDetails = experienceDetails;
    volunteer.exhibitions = exhibitions;

    // Handle profile photo update
    if (req.files.profilePhoto && req.files.profilePhoto[0]) {
      const profileFile = req.files.profilePhoto[0];
      const profilePhotoUrl = await uploadToCloudinary(
        profileFile.buffer,
        `profile_${Date.now()}`,
        "volunteers/profile"
      );
      volunteer.profilePhoto = profilePhotoUrl;
    }

    // Handle new gallery photos addition
    if (req.files.galleryPhotos) {
      for (const file of req.files.galleryPhotos) {
        const galleryUrl = await uploadToCloudinary(
          file.buffer,
          `gallery_${Date.now()}_${Math.random()}`,
          "volunteers/gallery"
        );
        volunteer.galleryPhotos.push(galleryUrl);
      }
    }

    await volunteer.save();
    res.status(200).json({ success: true, message: "Volunteer updated", volunteer });
  } catch (error) {
    console.error("❌ Volunteer update failed:", error);
    res.status(500).json({ success: false, message: "Volunteer update failed" });
  }
};

// Get volunteer by user ID (from Users collection)
const getVolunteerByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const volunteer = await Volunteer.findOne({ userId });

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found for this user",
      });
    }

    res.status(200).json({
      success: true,
      volunteer,
    });
  } catch (error) {
    console.error("❌ Error fetching volunteer by userId:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};




export {
  registerVolunteer,
  volunteerUploadMiddleware,
  getVolunteer,
  getVolunteerById,
  updateVolunteer,
  getVolunteerByUserId   
};
 