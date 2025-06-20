import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true, unique: true, match: /^[0-9]{10}$/ },
    username: {type:String,required:true, unique:true},
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,  // 🔑
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Invalid email']
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin","artist","volunteer"],
      default: "user",
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },

  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
