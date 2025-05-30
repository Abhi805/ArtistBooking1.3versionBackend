import eventPlanner from "../models/eventPlannerModel.js";
import { sendMail } from "../utils/mailHelper.js";

const eventPlannerConfirmation = async (req, res) => {
    const { fullName, phone, email, calender,description , } = req.body;
    try {
        if (!fullName || !phone || !calender) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const newRequest = new eventPlanner({
            fullName, phone, email, calender
            , description
        })

        await newRequest.save();


        // Email content options
        const mailOptions = {
            from: `"${fullName}" <${email || process.env.SMTP_EMAIL}>`, 
            to: process.env.SMTP_EMAIL,  // admin email
            subject: 'New Form Submission Received for Event Planner',
            html: `
        <h3>New Form Submission from contactUs Page</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Mobile:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${calender}</p>
        <p><strong>Service:</strong> ${description}</p>
      `,
        };

        await sendMail(mailOptions);

        res.status(201).json({ message: 'Request submitted successfully! contactUs ' });
        console.log({message: 'Request submitted successfully!' });
    } catch (error) {
        console.error("Inquiry error:", error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}


export default eventPlannerConfirmation;