


import nodemailer from "nodemailer";

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net", // ✅ Correct GoDaddy SMTP Host
    port: 465,
    // port: 587,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL, // ✅ info@gnvindia.com
      pass: process.env.SMTP_PASS   // ✅ Actual login password
    }
  });

  return transporter;
};

export const sendMail = async (mailOptions) => {
  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
