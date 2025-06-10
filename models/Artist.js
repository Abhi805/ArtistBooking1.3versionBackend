import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Invalid email']
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    match: [/^[0-9]{10}$/, 'Invalid mobile number']
  },
  city: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    // enum: ['15 mins', '30 mins', '45 mins', '1 hours', '2 hours', 'Custom'],
    default: 'Custom'
  },
  travel: {
    type: String,
    // enum: ['Local', 'National', 'International', 'Any'],
    // default: 'Any'
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    trim: true
  },
  team: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },

  images: [{
  type: String, // Will store Cloudinary URLs
  required: true,
  trim: true
}],

videoLink: [{
  type: String,
  trim: true,
  match: [/^(http|https):\/\/[^ "]+$/, 'Invalid video URL']
}],

  profileTitle: {
    type: String,
    trim: true,
    maxlength: 70
  },
  profileKeywords: {
    type: String,
    trim: true
  },
  profileDescription: {
    type: String,
    trim: true,
    maxlength: 360
  },
  isApproved: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

export default mongoose.model('ArtistRegistration', artistSchema);






