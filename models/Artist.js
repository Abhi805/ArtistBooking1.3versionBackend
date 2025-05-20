// const mongoose = require("mongoose");

// const artistSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     lastName: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     emailAddress: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true
//     },
//     mobileNumber: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     city: {
//         type: String,
//         required: true
//     },
//     performanceDuration: {
//         type: String,
//         required: true // Example: "45-60 mins"
//     },
//     openToTravel: {
//         type: Boolean,
//         default: false
//     },
//     category: {
//         type: String,
//         required: true // e.g. Singer, DJ, Band, etc.
//     },
//     musicGenres: {
//         type: [String],
//         required: true // e.g. ["Bollywood", "Punjabi"]
//     },
//     teamMembers: {
//         type: Number,
//         required: true
//     },
//     locationDescription: {
//         type: String,
//         required: true,
//         minlength: [300, "Location description must be at least 300 characters"]
//     },
//     mediaUploads: {
//         type: [String], // URLs or file paths
//         validate: {
//             validator: function (val) {
//                 return val.length >= 5;
//             },
//             message: "At least 5 media images are required"
//         }
//     },
//     artistVideos: {
//         type: [String],
//         validate: {
//             validator: function (val) {
//                 return val.length <= 3;
//             },
//             message: "Maximum 3 artist videos allowed"
//         }
//     },
//     profilePageTitle: {
//         type: String,
//         required: true
//     },
//     pageKeywords: {
//         type: String,
//         maxlength: [160, "Page keywords must be under 160 characters"]
//     },
//     profilePageDescribe: {
//         type: String,
//         maxlength: [166, "Profile description must be under 166 characters"]
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model("Artist", artistSchema);




// models/Artist.js
import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  name: String,
  bio: String,
  category: String,
  location: String,
  image: {
    data: Buffer, // 👈 Binary data
    contentType: String // 👈 MIME type (e.g. image/png)
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Artist', artistSchema);
