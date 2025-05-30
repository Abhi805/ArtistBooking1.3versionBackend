import mongoose from "mongoose";

const eventPlannerSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        calender: { type: String, required: true },
        description: { type: String },
        
    },
    { timestamps: true }
);

export default mongoose.model("EventPlannerBookings", eventPlannerSchema);
