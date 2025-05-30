import InquiryForm from "../models/inquiryModel.js";
import { sendMail } from "../utils/mailHelper.js";  // अपने प्रोजेक्ट के हिसाब से path ठीक करें

const sendInquiryConfirmation = async (req, res) => {
    const { fullName, phone, email, service, consent } = req.body;

    try {
        // जरूरी fields चेक करें
        if (!fullName || !phone || !consent || !service ) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // नया inquiry save करें
        const newRequest = new InquiryForm({ fullName, phone, email, service, consent });
        await newRequest.save();

        // Email content options
        const mailOptions = {
            from: `"${fullName}" <${email || process.env.SMTP_EMAIL}>`, // अगर user email ना दे तो default email से भेजें
            to: process.env.SMTP_EMAIL,  // admin email
            subject: 'New Connect Request',
            html: `
                   <h3>'New Connect Request from pop page</h3>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email || "Not Provided"}</p>
                <p><strong>Service:</strong> ${service || "Not Provided"}</p>
          
            `
        };

        // मेल भेजें
        await sendMail(mailOptions);

        res.status(201).json({ message: 'Request submitted successfully!' });
    } catch (err) {
        console.error("Inquiry error:", err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}

export default sendInquiryConfirmation;
