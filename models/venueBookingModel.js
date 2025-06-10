// models/EventBooking.js
import mongoose from "mongoose";

const venueBookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("venuebookings", venueBookingSchema);
