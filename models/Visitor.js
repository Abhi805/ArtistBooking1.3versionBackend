import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
}, { timestamps: true });

const Visitor = mongoose.model("Visitor", visitorSchema);
export default Visitor;
