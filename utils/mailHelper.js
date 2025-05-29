import nodemailer from "nodemailer";

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
};

/**
 * Send email with given options
 * @param {Object} mailOptions - { from, to, subject, text/html }
 * @returns {Promise}
 */
export const sendMail = async (mailOptions) => {
  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent Utils:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
