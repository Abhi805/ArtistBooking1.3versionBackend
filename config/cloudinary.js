
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary'

dotenv.config();

try {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

  // Optional: check if values loaded correctly
  if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
    throw new Error("Cloudinary config values missing in .env file");
  }

  console.log("✅ Cloudinary configured successfully int");
} catch (error) {
  console.error("❌ Cloudinary configuration error:", error.message);
  // Optionally: process.exit(1); // to stop the server if critical
}

export default cloudinary;
