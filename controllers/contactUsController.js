import ContactUs from "../models/contactUsModel.js";
import { sendMail } from "../utils/mailHelper.js";

const contactUsConfirmation = async (req, res) => {
    const { fullName, phone, email, service, company, address, message, consent } = req.body;
    try {
        if (!fullName || !phone || !consent || !service) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const newRequest = new ContactUs({
            fullName, phone, email, service
            , company, address, message, consent
        })

        await newRequest.save();


        // Email content options
        const mailOptions = {
            from: `"${fullName}" <${email || process.env.SMTP_EMAIL}>`, // अगर user email ना दे तो default email से भेजें
            to: process.env.SMTP_EMAIL,  // admin email
            subject: 'New Form Submission Received',
            html: `
        <h3>New Form Submission from contactUs Page</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Mobile:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Message:</strong> ${message}</p>
      
      `,
        };

        await sendMail(mailOptions);

        res.status(201).json({ message: 'Request submitted successfully!' });
    } catch (error) {
        console.error("Inquiry error:", error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}


export default contactUsConfirmation;