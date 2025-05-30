import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  // volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: "Volunteer", required: true },
  fullName: String,
  phone: String,
  email: String,
  eventType: String,
  eventDate: Date,
  budget: String,
  city: String,
  requirementType: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("VolunteerBooking", volunteerSchema);
