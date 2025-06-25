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


import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming your user model name is "User"
    required: true,
  },
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
  // reachCount: {
  //   type: Number,
  //   default: 0,
  // },
});

export default mongoose.model("Volunteer", volunteerSchema);
