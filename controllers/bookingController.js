import Booking from "../models/bookingModel.js";
import nodemailer from "nodemailer";


const sendBookingConfirmation = async (req, res) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS,
        },
    });
    //ikad dzbt byct tzsx

    try {
        const {
            fullName,
            phone,
            email,
            eventType,
            eventDate,
            budget,
            city,
            requirement,
            artistId,
            artistName,
        } = req.body;
        if (!fullName || !phone || !eventDate || !artistId) {
            return res.status(400).json({ message: "Missing required fields." });
        }
        const newBooking = new Booking({
            fullName,
            phone,
            email,
            eventType,
            eventDate,
            budget,
            city,
            requirement,
            artistId,
            artistName,
        });
        await newBooking.save();
        //Send email to admin
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: process.env.SMTP_EMAIL, // admin email
            subject: `New Booking from ${fullName}`,
            html: `
        <h3>New Booking Request</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
        <p><strong>Event Type:</strong> ${eventType}</p>
        <p><strong>Date:</strong> ${eventDate}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Requirement:</strong> ${requirement}</p>
        <p><strong>Artist ID:</strong> ${artistId}</p>
        <p><strong>Artist Name:</strong> ${artistName}</p>
      `,
        };
        await transporter.sendMail(mailOptions);
        res.status(201).json({ message: "Booking submitted and email sent." });
        console.log("bookingsuccessfully");
    } catch (err) {
        console.error("Booking error:", err);
        res.status(500).json({ message: "Server error. Please try again." });
    }
}


export default sendBookingConfirmation;