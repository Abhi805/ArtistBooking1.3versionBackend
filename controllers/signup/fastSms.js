// import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendOTPfast = async (req, res) => {
  try {
    const mobile = req.body.mobile || "9165671529"; // dynamic or default fallback
    const otp = Math.floor(1000 + Math.random() * 9000);
    const message = `Your One OTP is ${otp}. Please do not share it with anyone.`;

    const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.FAST2SMS_API_KEY}&route=otp&variables_values=${otp}&numbers=${mobile}`;

    const response = await axios.get(url, {
      headers: {
        "cache-control": "no-cache",
      },
    });

    console.log("✅ OTP sent:", response.data);
    return res.status(200).json({ success: true, message: "OTP sent", otp }); // remove OTP in production
  } catch (error) {
    console.error("❌ Error sending OTP:", error.response?.data || error.message);
    return res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};



import axios from "axios";

export const sendOTP2Factor = async (req, res) => {
    try {
        const { mobile } = req.body;
        // const mobile = "9876543210";

        const apiKey = process.env.TWO_FACTOR_API_KEY;

        const url = `https://2factor.in/API/V1/${apiKey}/SMS/${mobile}/AUTOGEN/OTP1`;

        const response = await axios.get(url);

        if (response.data.Status === "Success") {
            const sessionId = response.data.Details;
            console.log("📦 OTP sessionId:", sessionId); // ✅ LOG THIS

            return res.status(200).json({
                success: true,
                message: "OTP sent successfully",
                sessionId: response.data.Details,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Failed to send OTP",
            });
        }
    } catch (error) {
        console.error("OTP Send Error:", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};



export const verifyOTP2Factor = async (req, res) => {
    const { sessionId, otp } = req.body;
    const apiKey = process.env.TWO_FACTOR_API_KEY;

    const url = `https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${sessionId}/${otp}`;

    try {
        const response = await axios.get(url);
        if (response.data.Status === "Success") {
            return res.status(200).json({ success: true, message: "OTP Verified" });
        } else {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }
    } catch (error) {
        console.error("OTP Verify Error:", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

