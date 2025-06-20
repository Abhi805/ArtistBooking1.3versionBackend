


// import cloudinary from "../../config/cloudinary.js";
// import multer from "multer";
// import Volunteer from "../../models/Volunteer.js";

// // Multer memory storage for Cloudinary uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// const volunteerUploadMiddleware = upload.fields([
//   { name: "profilePhoto", maxCount: 1 },
//   { name: "galleryPhotos", maxCount: 10 },
// ]);

// // Upload image buffer to Cloudinary
// const uploadToCloudinary = (fileBuffer, fileName, folder) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload_stream(
//       {
//         resource_type: "image",
//         public_id: `${folder}/${fileName}`,
//         folder,
//       },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result.secure_url);
//       }
//     ).end(fileBuffer);
//   });
// };

// // Register a new volunteer with file uploads
// const registerVolunteer = async (req, res) => {
//   try {
//     const userId = req.user._id; // ✅ from JWT
//     const {
//       fullName,
//       email,
//       mobile,
//       dob,
//       category,
//       location,
//       shift,
//       experience,
//       awards,
//       education,
//       summary,
//     } = req.body;

//     // Parse JSON string fields from form-data
//     const skills = JSON.parse(req.body.skills || "[]");
//     const experienceDetails = JSON.parse(req.body.experienceDetails || "[]");
//     const exhibitions = JSON.parse(req.body.exhibitions || "[]");

//     let profilePhotoUrl = null;
//     const galleryPhotoUrls = [];

//     if (req.files.profilePhoto && req.files.profilePhoto[0]) {
//       const profileFile = req.files.profilePhoto[0];
//       profilePhotoUrl = await uploadToCloudinary(
//         profileFile.buffer,
//         `profile_${Date.now()}`,
//         "volunteers/profile"
//       );
//     }

//     if (req.files.galleryPhotos) {
//       for (const file of req.files.galleryPhotos) {
//         const url = await uploadToCloudinary(
//           file.buffer,
//           `gallery_${Date.now()}_${Math.random()}`,
//           "volunteers/gallery"
//         );
//         galleryPhotoUrls.push(url);
//       }
//     }
//     // Continue with rest of logic...
//     const newVolunteer = new Volunteer({
//         userId, // ✅ yeh jaroori hai

//       fullName,
//       email,
//       mobile,
//       dob,
//       category,
//       location,
//       shift,
//       experience,
//       awards,
//       education,
//       summary,
//       profilePhoto: profilePhotoUrl,         // ✅ fixed
//       galleryPhotos: galleryPhotoUrls,       // ✅ fixed
//       skills,
//       experienceDetails,
//       exhibitions,
//     });


//     await newVolunteer.save();
//     console.log("✅ Saved to DB:", newVolunteer);

//     return res.status(200).json({
//       success: true,
//       message: "Volunteer registered successfully",
//       volunteer: newVolunteer,
//     });
//   } catch (error) {
//     console.error("❌ Volunteer registration failed:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Volunteer registration failed",
//     });
//   }
// };

// // Get all volunteers
// const getVolunteer = async (req, res) => {
//   try {
//     const volunteers = await Volunteer.find();
//     res.status(200).json(volunteers);
//   } catch (err) {
//     console.error("❌ Error fetching volunteers:", err);
//     res.status(500).json({ message: "Failed to fetch volunteers" });
//   }
// };

// // Get volunteer by ID
// const getVolunteerById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const volunteer = await Volunteer.findById(id);
//     if (!volunteer) {
//       return res.status(404).json({
//         success: false,
//         message: "Volunteer not found",
//       });
//     }
//     res.status(200).json(volunteer);
//   } catch (err) {
//     console.error("❌ Error fetching volunteer by ID:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch volunteer",
//     });
//   }
// };





// //update volunteer
// const updateVolunteer = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const volunteer = await Volunteer.findById(id);
//     if (!volunteer) {
//       return res.status(404).json({ success: false, message: "Volunteer not found" });
//     }

//     const {
//       fullName,
//       email,
//       mobile,
//       dob,
//       category,
//       location,
//       shift,
//       experience,
//       awards,
//       education,
//       summary,
//     } = req.body;

//     const skills = JSON.parse(req.body.skills || "[]");
//     const experienceDetails = JSON.parse(req.body.experienceDetails || "[]");
//     const exhibitions = JSON.parse(req.body.exhibitions || "[]");

//     if (fullName) volunteer.fullName = fullName;
//     if (email) volunteer.email = email;
//     if (mobile) volunteer.mobile = mobile;
//     if (dob) volunteer.dob = dob;
//     if (category) volunteer.category = category;
//     if (location) volunteer.location = location;
//     if (shift) volunteer.shift = shift;
//     if (experience) volunteer.experience = experience;
//     if (awards) volunteer.awards = awards;
//     if (education) volunteer.education = education;
//     if (summary) volunteer.summary = summary;

//     volunteer.skills = skills;
//     volunteer.experienceDetails = experienceDetails;
//     volunteer.exhibitions = exhibitions;

//     // Handle profile photo update
//     if (req.files.profilePhoto && req.files.profilePhoto[0]) {
//       const profileFile = req.files.profilePhoto[0];
//       const profilePhotoUrl = await uploadToCloudinary(
//         profileFile.buffer,
//         `profile_${Date.now()}`,
//         "volunteers/profile"
//       );
//       volunteer.profilePhoto = profilePhotoUrl;
//     }

//     // Handle new gallery photos addition
//     if (req.files.galleryPhotos) {
//       for (const file of req.files.galleryPhotos) {
//         const galleryUrl = await uploadToCloudinary(
//           file.buffer,
//           `gallery_${Date.now()}_${Math.random()}`,
//           "volunteers/gallery"
//         );
//         volunteer.galleryPhotos.push(galleryUrl);
//       }
//     }

//     await volunteer.save();
//     res.status(200).json({ success: true, message: "Volunteer updated", volunteer });
//   } catch (error) {
//     console.error("❌ Volunteer update failed:", error);
//     res.status(500).json({ success: false, message: "Volunteer update failed" });
//   }
// };

// // Get volunteer by user ID (from Users collection)
// const getVolunteerByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const volunteer = await Volunteer.findOne({ userId });

//     if (!volunteer) {
//       return res.status(404).json({
//         success: false,
//         message: "Volunteer not found for this user",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       volunteer,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching volunteer by userId:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };




// export {
//   registerVolunteer,
//   volunteerUploadMiddleware,
//   getVolunteer,
//   getVolunteerById,
//   updateVolunteer,
//   getVolunteerByUserId   
// };



import { sendMail } from "../../utils/mailHelper.js";
import cloudinary from "../../config/cloudinary.js";
import multer from "multer";
import Volunteer from "../../models/Volunteer.js";
import { LOGO_URL } from "../../config/constants.js";
// Multer setup for memory storage
console.log("Logo URL:", LOGO_URL);
const storage = multer.memoryStorage();
const upload = multer({ storage });

const volunteerUploadMiddleware = upload.fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "galleryPhotos", maxCount: 10 },
]);

// Cloudinary upload function
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

// Register volunteer
const registerVolunteer = async (req, res) => {
  try {
    const userId = req.user._id;
    const userEmail = req.user.email;
    const userName = req.user.fullName;
    console.log("📧 User Email:", userEmail);
    console.log("👤 User Name:", userName);
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

    // Parse JSON fields
    const skills = JSON.parse(req.body.skills || "[]");
    const experienceDetails = JSON.parse(req.body.experienceDetails || "[]");
    const exhibitions = JSON.parse(req.body.exhibitions || "[]");
    const education = JSON.parse(req.body.education || "[]");
    const awards = JSON.parse(req.body.awards || "[]");

    let profilePhotoUrl = null;
    const galleryPhotoUrls = [];

    // Upload profile photo
    if (req.files.profilePhoto && req.files.profilePhoto[0]) {
      const profileFile = req.files.profilePhoto[0];
      profilePhotoUrl = await uploadToCloudinary(
        profileFile.buffer,
        `profile_${Date.now()}`,
        "volunteers/profile"
      );
    }

    // Upload gallery photos
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

    const newVolunteer = new Volunteer({
      userId,
      fullName,
      email,
      mobile,
      dob,
      category,
      location,
      shift,
      experience,
      summary,
      awards,
      education,
      exhibitions,
      skills,
      experienceDetails,
      profilePhoto: profilePhotoUrl,
      galleryPhotos: galleryPhotoUrls,
    });

    await newVolunteer.save();

    // 👇 Fir mail bhejo
    await sendMail({
      from: process.env.SMTP_EMAIL, // info@gnvindia.com
      to: userEmail,
      subject: "🎉 Congratulations! Volunteer Profile Created",

      html: `
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">

    <!-- Header with GNV Logo and Profile Photo -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
      <tr>
        <td align="left" style="width: 80%;">
          <img src="${LOGO_URL}" alt="GNV India Logo" style="max-width: 220px;">
        </td>
        <td align="right" style="width: 50%;">
          <img src="${profilePhotoUrl}" alt="Your Profile Photo" style="width: 130px; height: 130px; border-radius: 50%; object-fit: cover; border: 2px solid #ccc;">
        </td>
      </tr>
    </table>

    <!-- Greeting -->
    <h2 style="color: #2b6cb0;">Hi ${userName},</h2>

    <!-- Main Message -->
    <p>🎉 Your <strong>volunteer profile</strong> has been successfully created on <strong>GNV India Entertainment</strong>.</p>
    <p>We're thrilled to have you on board and look forward to your amazing contributions.</p>

    <!-- Divider -->
    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

    <!-- Footer -->
    <p style="font-size: 14px;">If you have any questions, feel free to reach out.</p>
    <p>Warm regards,<br><strong>Team GNV India Entertainment</strong></p>
  </div>
` 


    });

    return res.status(200).json({
      success: true,
      message: "Volunteer profile created and confirmation email sent",
      volunteer: newVolunteer,
    });


  } catch (error) {
    console.error("❌ Volunteer registration failed:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update volunteer
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

// Get volunteer by user ID
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
  updateVolunteer,
  volunteerUploadMiddleware,
  getVolunteer,
  getVolunteerById,
  getVolunteerByUserId,
};
