// create-admin.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI; // your MongoDB URI here
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB error", err));

const userSchema = new mongoose.Schema({
  fullName: String,
  mobileNumber: String,
  email: String,
  password: String,
  role: { type: String, default: "user" }
});

const User = mongoose.model("User", userSchema);

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const existing = await User.findOne({ email: "admin@example.com" });
if (existing) {
  console.log("❌ Admin already exists. Deleting and recreating...");
  await User.deleteOne({ email: "admin@example.com" });
}

  const admin = new User({
    fullName: "Super Admin",
    mobileNumber: "9999999999",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin"
  });

  await admin.save();
  console.log("✅ Admin created successfully");
  process.exit();
};

createAdmin();
