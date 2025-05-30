import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    service: { type: String, required: true },
    company: { type: String },
    address: { type: String },
    message: { type: String },
    consent: { type: Boolean, default: false, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
    { timestamps: true }
);

export default mongoose.model('contactUs', contactSchema);
