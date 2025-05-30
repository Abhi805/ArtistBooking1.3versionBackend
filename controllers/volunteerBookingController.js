// controllers/rentalController.js
import VolunteerBooking from "../models/volunteerBookinModel.js";
import { sendMail } from "../utils/mailHelper.js";

const volunteerBookingController = async (req, res) => {
  const { fullName, phone, email,service,calendar,budget,city,requirement } = req.body;
  try {
    if (!fullName || !phone || !calendar || !city ||!service) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newBooking = new VolunteerBooking({
      fullName,
      phone,
      email,
      service,
      calendar,
      budget,
      city,
      requirement
    
    });

    await newBooking.save();

    // Email content for admin
    const mailOptions = {
      from: `"${fullName}" <${email || process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL, // admin email
      subject: "Volunteer Booking",
      html: `
        <h3>Volunteer Booking</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Email:</strong> ${service}</p>
        <p><strong>Date:</strong> ${new Date(calendar).toLocaleDateString()}</p>
        <p><strong>Equipment:</strong> ${budget}</p>
        <p><strong>Description:</strong> ${city}</p>
        <p><strong>Description:</strong> ${requirement}</p>
      `,
    };

    await sendMail(mailOptions);

    res.status(201).json({ message: "Booking submitted successfully!" });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};


export default volunteerBookingController;