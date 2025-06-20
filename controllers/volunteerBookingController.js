// controllers/rentalController.js
import VolunteerBooking from "../models/volunteerBookinModel.js";
import { sendMail } from "../utils/mailHelper.js";
const volunteerBookingController = async (req, res) => {
  const { fullName, phone, email, service, calendar, budget, city, requirement } = req.body;

  try {
    const missingFields = [];
    if (!fullName) missingFields.push("fullName");
    if (!phone) missingFields.push("phone");
    if (!calendar) missingFields.push("calendar");
    if (!city) missingFields.push("city");
    if (!service) missingFields.push("service");

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields.",
        missingFields,
      });
    }

    const newBooking = new VolunteerBooking({
      fullName,
      phone,
      email,
      service,
      calendar,
      budget,
      city,
      requirement,
    });

    await newBooking.save();

    const mailOptions = {
      from: `"${fullName}" <${email || process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL,
      subject: "Volunteer Booking",
      html: `
        <h3>Volunteer Booking</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${new Date(calendar).toLocaleDateString()}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Requirement:</strong> ${requirement}</p>
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