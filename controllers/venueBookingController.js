// controllers/rentalController.js
import venueBooking from "../models/volunteerBookinModel.js";
import { sendMail } from "../utils/mailHelper.js";

const venueBookingController = async (req, res) => {
    const { fullName, phone, email,calendar ,description } = req.body;
    try {

        if (!fullName || !phone || !calendar) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newBooking = new venueBooking({
            fullName,
            phone,
            email,
            calendar,
            description,

        });
 
        await newBooking.save();

        // Email content for admin
        const mailOptions = {
            from: `"${fullName}" <${email || process.env.SMTP_EMAIL}>`,
            to: process.env.SMTP_EMAIL, // admin email
            subject: "Venue Booking",
            html: `
        <h3>Venue Booking</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Email:</strong> ${calendar}</p>
        <p><strong>Date:</strong> ${new Date(calendar).toLocaleDateString()}</p>
        <p><strong>Equipment:</strong> ${description}</p>
      `,
        };

        await sendMail(mailOptions);

        res.status(201).json({ message: "Booking submitted successfully!" });
    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ error: "Something went wrong." });
    }
};


export default venueBookingController;