import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true, unique: true , match: /^[0-9]{10}$/},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    
  },
  { timestamps: true }
);

const User = mongoose.model("UserLoginSingup", userSchema);

export default User;
