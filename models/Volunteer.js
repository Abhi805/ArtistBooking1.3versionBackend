
import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  dob: Date,
  age: Number,
  gender: String,
  address: String,
  addressState: String,
  addressDistrict: String,
  phone: String,
  zipCode: String,
  
  profileImage: String,           // Path to profile image
  galleryImages: [String],        // Array of gallery image paths

  hasExhibition: String,          // "Yes" or "No"
  exhibitionName: String,
  exhibitionDesc: String,

  profileSummary: String,

  educationLevel: String,
  degree: String,

  hasAward: String,               // "Yes" or "No"
  awards: [String],

  skills: [ 
    {
      skill: String,
      level: String,              // e.g., "Excellent", "Good", "Average"
    },
  ],

  selectedState: String,          // State for performance
  selectedDistricts: [String],    // Districts for performance

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Volunteer", volunteerSchema);









// models/Volunteer.js
// import mongoose from "mongoose";

// const volunteerSchema = new mongoose.Schema({
//     userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // Assuming your user model name is "User"
//     required: true,
//   },
//   fullName: String,
//   email: String,
//   mobile: String,
//   dob: Date,
//   category: String,
//   location: String,   
//   shift: String,
//   experience: String,
//   profilePhoto: String, // path to single profile image
//   galleryPhotos: [String], // array of image paths
//   exhibitions: [String],
//   skills: [
//     {
//       tool: String,
//       level: Number, // percentage
//     },
//   ],
//   awards: [String],
//   education: [String],
//   summary: String,
//   experienceDetails: [
//     {
//       role: String,
//       from: String,
//       to: String,
//       points: [String],
//     },
//   ],
// });

// export default mongoose.model("Volunteer", volunteerSchema);
