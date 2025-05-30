import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    eventType: { type: String },
    eventDate: { type: String, required: true },
    budget: { type: String },
    city: { type: String },
    requirement: { type: String },
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
     artistName: String,
  },
  { timestamps: true }
);

export default mongoose.model("artistBooking", bookingSchema);
