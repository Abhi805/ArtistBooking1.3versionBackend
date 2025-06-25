import bcrypt from 'bcrypt';
import User from "../../models/User.js";
// import twilio from "twilio";
import jwt from "jsonwebtoken";
import axios from "axios";




export const sendOtp = async (req, res) => {
  const { mobile, username, email } = req.body;

  if (!mobile || !username) {
    return res.status(400).json({ error: "Mobile and username are required." });
  }

  try {
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists." });
    }

    if (email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists." });
      }
    }

    // const existingMobile = await User.findOne({ mobile });
    // if (existingMobile) {
    //   return res.status(400).json({ error: "Mobile number already exists." });
    // }

    const apiKey = process.env.TWO_FACTOR_API_KEY;
    // const templateId = process.env.TWO_FACTOR_TEMPLATE_ID; // Optional: use if needed

    const url = `https://2factor.in/API/V1/${apiKey}/SMS/${mobile}/AUTOGEN/OTP1`;

    const response = await axios.get(url);

    if (response.data.Status === "Success") {
      const sessionId = response.data.Details;
      console.log("✅ OTP sessionId:", sessionId);
      return res.status(200).json({
        success: true,
        message: "OTP sent successfully.",
        sessionId: sessionId,
      });
    } else {
      return res.status(400).json({ error: "Failed to send OTP." });
    }
  } catch (err) {
    console.error("Error sending OTP:", err.message);
    res.status(500).json({ error: "Server error." });
  }
};



export const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    dob,
    gender,
    username,
    password,
    confirmPassword,
    mobile,
    otp,
    sessionId,
    email = ""
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, error: "Passwords do not match" });
  }

  try {
    const apiKey = process.env.TWO_FACTOR_API_KEY;
    const verifyUrl = `https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${sessionId}/${otp}`;

    const response = await axios.get(verifyUrl);

    if (response.data.Status !== "Success") {
      return res.status(400).json({ success: false, error: "Invalid OTP" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ success: false, error: "Username already taken" });
    }

    if (email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ success: false, error: "Email already registered" });
      }
    }

    
    // const existingMobile = await User.findOne({ mobile });
    // if (existingMobile) {
    //   return res.status(400).json({ error: "Mobile number already exists." });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      dob,
      gender,
      username,
      password: hashedPassword,
      mobile,
      email,
      isVerified: true,
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully!" });

  } catch (err) {
    console.error("Registration error:", err.message, err);
    res.status(500).json({ success: false, error: "Server error." });
  }
};







export const loginUser = async (req, res) => {
  const { loginId, password } = req.body;

  if (!loginId || !password) {
    return res.status(400).json({ success: false, error: "Username and password are required." });
  }

  try {
    const user = await User.findOne({
      $or: [
        { username: loginId },
        { email: loginId },
        { mobile: loginId },
      ],
    });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // safer for deployment
      sameSite: "None", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });


    res.status(200).json({ success: true, token, userId: user._id, msg: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}

export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "Logged out successfully" });
};
