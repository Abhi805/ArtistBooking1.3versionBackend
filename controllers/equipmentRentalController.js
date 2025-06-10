// controllers/rentalController.js
import RentalBooking from "../models/RentalBookingModel.js";
import { sendMail } from "../utils/mailHelper.js";

const equipmentRentalController = async (req, res) => {
  const { fullName, phone, email, calendar, equipmentName, description } = req.body;
  try {
    if (!fullName || !phone || !calendar || !equipmentName) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newBooking = new RentalBooking({
      fullName,
      phone,
      email,
      calendar,
      equipmentName,
      description,
    });

    await newBooking.save();

    // Email content for admin
    const mailOptions = {
      from: `"${fullName}" <${email || process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL, // admin email
      subject: "Equipment Rental Booking",
      html: `
        <h3>New Rental Booking</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date(calendar).toLocaleDateString()}</p>
        <p><strong>Equipment:</strong> ${equipmentName}</p>
        <p><strong>Description:</strong> ${description}</p>
      `,
    };

    await sendMail(mailOptions);

    res.status(201).json({ message: "Booking submitted successfully!" });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};


export default equipmentRentalController;