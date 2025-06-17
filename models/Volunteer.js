import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  fullName: String,
  mobile: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  category: String,
  shift: String,
  location: String,
  experience: String,
  profilePhoto: String,
  galleryPhotos: [String]
});

export default mongoose.model('Volunteer', volunteerSchema);
