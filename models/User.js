// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     fullName: { type: String, required: true },
//     mobileNumber: { type: String, required: true, unique: true, match: /^[0-9]{10}$/ },
//     username: { type: String, required: true, unique: true },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,  // 🔑
//       trim: true,
//       match: [/\S+@\S+\.\S+/, 'Invalid email']
//     },
//     password: { type: String, required: true },
//     role: {   
//       type: String,
//       enum: ["user", "admin", "artist", "volunteer"],
//       default: "user",
//     },
//     authType: { type: String, enum: ["custom", "google"], default: "custom" },
//     profileCompleted: {
//       type: Boolean,
//       default: false,
//     },

//   },

//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);

// export default User;



// models/User.js
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  mobile: { type: String, required: true }, // 10-digit mobile number
  email: { type: String, unique: true, sparse: true, default: "" },

  role: {
    type: String,
    enum: ["user", "admin", "artist", "volunteer", "unassigned",],
    default: "unassigned",
  },

  isVerified: { type: Boolean, default: false },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
export default User;
