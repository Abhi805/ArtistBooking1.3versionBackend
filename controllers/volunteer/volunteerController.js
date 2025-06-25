


// volunteerController.js
import Volunteer from "../../models/Volunteer.js";
import cloudinary from "../../config/cloudinary.js";
import multer from "multer";
import { sendMail } from "../../utils/mailHelper.js";
import { LOGO_URL } from "../../config/constants.js";


// Multer memory storage setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Multer middleware
const volunteerUploadMiddleware = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "galleryImages", maxCount: 5 },
]);

// Cloudinary upload helper
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

const registerVolunteer = async (req, res) => {
  try {
    const userId = req.user._id;
    const userEmail = req.user.email;
    const userName = req.user.fullName;

    const data = req.body;

    // Parse JSON fields from string
    const parsedSkills = JSON.parse(data.skills || "[]");
    const parsedAwards = JSON.parse(data.awards || "[]");
    const parsedEducation = JSON.parse(data.education || "[]");
    const parsedExperience = JSON.parse(data.experienceDetails || "[]");
    const parsedDistricts = JSON.parse(data.selectedDistricts || "[]");

    // Handle image uploads
    const profileImageBuffer = req.files?.profileImage?.[0]?.buffer;
    const galleryImageBuffers = req.files?.galleryImages || [];

    const profileImageUrl = profileImageBuffer
      ? await uploadToCloudinary(
          profileImageBuffer,
          `profile_${Date.now()}`,
          "volunteers/profile"
        )
      : null;

    const galleryUrls = [];
    for (const file of galleryImageBuffers) {
      const url = await uploadToCloudinary(
        file.buffer,
        `gallery_${Date.now()}_${Math.random()}`,
        "volunteers/gallery"
      );
      galleryUrls.push(url);
    }

    // Save to MongoDB
    const newVolunteer = new Volunteer({
      userId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      dob: data.dob,
      age: data.age,
      gender: data.gender,
      address: data.address,
      addressState: data.addressState,
      addressDistrict: data.addressDistrict,
      phone: data.phone,
      zipCode: data.zipCode,
      hasExhibition: data.hasExhibition,
      exhibitionName: data.exhibitionName,
      exhibitionDesc: data.exhibitionDesc,
      profileSummary: data.profileSummary,
      educationLevel: data.educationLevel,
      degree: data.degree,
      hasAward: data.hasAward,
      awards: parsedAwards,
      skills: parsedSkills,
      education: parsedEducation,
      selectedState: data.selectedState,
      selectedDistricts: parsedDistricts,
      profileImage: profileImageUrl,
      galleryImages: galleryUrls,
    });

    await newVolunteer.save();

    // Send confirmation email
    await sendMail({
      from: process.env.SMTP_EMAIL,
      to: userEmail,
      subject: "🎉 Congratulations! Volunteer Profile Created",
      html: `
        <div style="font-family: Arial; max-width: 600px;">
          <table width="100%">
            <tr>
              <td><img src="${LOGO_URL}" style="max-width: 200px;" /></td>
              <td align="right">
                <img src="${profileImageUrl}" style="width: 120px; height: 120px; border-radius: 50%;" />
              </td>
            </tr>
          </table>
          <h2>Hi ${userName},</h2>
          <p>Your volunteer profile has been created successfully at GNV India Entertainment.</p>
          <p>Warm regards,<br/>Team GNV India Entertainment</p>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Volunteer registered successfully",
      volunteer: newVolunteer,
    });
  } catch (error) {
    console.error("❌ Register Volunteer Error:", error.message, error.stack);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message, 
    });
  }
};
const getVolunteer = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().populate("userId", "username");
    res.status(200).json(volunteers);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch volunteers" });
  }
};

const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) return res.status(404).json({ message: "Not found" });
    res.status(200).json(volunteer);
  } catch (error) {
    console.error("Fetch by ID Error:", error);
    res.status(500).json({ message: "Error fetching volunteer" });
  }
};

const getVolunteerByUserId = async (req, res) => {
  try {
    const volunteer = await Volunteer.findOne({ userId: req.params.userId });
    if (!volunteer) return res.status(404).json({ message: "Not found" });
    res.status(200).json(volunteer);
  } catch (error) {
    console.error("Fetch by UserID Error:", error);
    res.status(500).json({ message: "Error fetching volunteer" });
  }
};

const getVolunteerByUsername = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().populate("userId");
    const match = volunteers.find(v => v.userId?.username === req.params.username);
    if (!match) return res.status(404).json({ message: "Volunteer not found" });
    res.status(200).json(match);
  } catch (error) {
    console.error("Fetch by Username Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// // Update volunteer
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
      summary,
    } = req.body;

    const skills = JSON.parse(req.body.skills || "[]");
    const experienceDetails = JSON.parse(req.body.experienceDetails || "[]");
    const exhibitions = JSON.parse(req.body.exhibitions || "[]");
    const education = JSON.parse(req.body.education || "[]");
    const awards = JSON.parse(req.body.awards || "[]");

    if (fullName) volunteer.fullName = fullName;
    if (email) volunteer.email = email;
    if (mobile) volunteer.mobile = mobile;
    if (dob) volunteer.dob = dob;
    if (category) volunteer.category = category;
    if (location) volunteer.location = location;
    if (shift) volunteer.shift = shift;
    if (experience) volunteer.experience = experience;
    if (summary) volunteer.summary = summary;

    volunteer.skills = skills;
    volunteer.experienceDetails = experienceDetails;
    volunteer.exhibitions = exhibitions;
    volunteer.education = education;
    volunteer.awards = awards;

    if (req.files.profilePhoto && req.files.profilePhoto[0]) {
      const profileFile = req.files.profilePhoto[0];
      const profilePhotoUrl = await uploadToCloudinary(
        profileFile.buffer,
        `profile_${Date.now()}`,
        "volunteers/profile"
      );
      volunteer.profilePhoto = profilePhotoUrl;
    }

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





export {
  volunteerUploadMiddleware,
  registerVolunteer,
  getVolunteer,
  getVolunteerById,
  getVolunteerByUserId,
  getVolunteerByUsername,
  updateVolunteer
};
