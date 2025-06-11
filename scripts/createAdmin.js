// create-admin.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

// const MONGO_URI = process.env.MONGO_URI;
const MONGO_URI = `mongodb+srv://abhishekrathore1921:9bqXVAPjSGwHg6TP@cluster0.lbxeszm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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
  const hashedPassword = await bcrypt.hash("gnvindia7@.", 10);

  const existing = await User.findOne({ email: "abhishekrathore1921@gmail.com" });
if (existing) {
  console.log("❌ Admin already exists. Deleting and recreating...");
  await User.deleteOne({ email: "abhishekrathore1921@gmail.com" });
}

  const admin = new User({
    fullName: "Super Admin",
    mobileNumber: "9165671529",
    email: "abhishekrathore1921@gmail.com",
    password: hashedPassword,
    role: "admin"
  });

  await admin.save();
  console.log("✅ Admin created successfully");
  process.exit();
};

createAdmin();
