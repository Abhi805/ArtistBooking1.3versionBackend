// import mongoose from 'mongoose';

// const volunteerSchema = new mongoose.Schema({
//   fullName: String,
//   mobile: String,
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   category: String,
//   shift: String,
//   location: String,
//   experience: String,
//   profilePhoto: String,
//   galleryPhotos: [String]
// });

// export default mongoose.model('Volunteer', volunteerSchema);






// models/Volunteer.js
import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobile: String,
  dob: Date,
  category: String,
  location: String,   
  shift: String,
  experience: String,
  profilePhoto: String, // path to single profile image
  galleryPhotos: [String], // array of image paths
  exhibitions: [String],
  skills: [
    {
      tool: String,
      level: Number, // percentage
    },
  ],
  awards: [String],
  education: [String],
  summary: String,
  experienceDetails: [
    {
      role: String,
      from: String,
      to: String,
      points: [String],
    },
  ],
});

export default mongoose.model("Volunteer", volunteerSchema);
