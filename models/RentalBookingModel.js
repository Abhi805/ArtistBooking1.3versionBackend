// models/RentalBookingModel.js
import mongoose from "mongoose";

const rentalBookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  calendar: { type: Date, required: true },
  equipmentName: { type: String,required: true  },
  description: { type: String },
}, { timestamps: true });

const RentalBooking = mongoose.model("EquipmentRentalBooking", rentalBookingSchema);
export default RentalBooking;
