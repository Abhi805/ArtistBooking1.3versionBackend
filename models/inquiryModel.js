import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        service: { type: String, required: true },
        consent: { type: Boolean, default: false, required:true },
    },
    { timestamps: true }
);

export default mongoose.model("InquiryFormpopup", inquirySchema);
