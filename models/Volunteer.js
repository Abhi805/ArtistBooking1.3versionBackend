
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





