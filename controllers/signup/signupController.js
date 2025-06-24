import bcrypt from 'bcrypt';
import User from "../../models/User.js";
import twilio from "twilio";
import jwt from "jsonwebtoken";


const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOtp = async (req, res) => {
  const { mobile, username, email } = req.body;

  if (!mobile || !username) {
    return res.status(400).json({ error: "Mobile and username are required." });
  }

  try {
    const existingMobile = await User.findOne({ mobile });
    if (existingMobile) {
      return res.status(400).json({ error: "Mobile number already exists." });
    }

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

    await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verifications.create({ to: mobile, channel: "sms" });

    res.status(200).json({ message: "OTP sent successfully." });
  } catch (err) {
      console.error("Error sending OTP:", err); // 🔍 See full error in console
    res.status(500).json({ error: "Failed to send OTP." });
  }
};


// Register User
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
    email = ""
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, error: "Passwords do not match" });
  }

  try {
    const check = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verificationChecks.create({ to: mobile, code: otp });

    if (check.status !== 'approved') {
      return res.status(400).json({ success: false, error: "Invalid OTP" });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ success: false, error: "Username already taken" });
    }

    const existingMobile = await User.findOne({ mobile });
    if (existingMobile) {
        return res.status(400).json({ success: false, error: "Mobile number already registered" });
    }

    if (email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ success: false, error: "Email already registered" });
      }
    }

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
    res.status(500).json({ success: false, error: err.message });
  }
};



export const loginUser = async (req, res) => {
  const { loginId , password } = req.body;

  if (!loginId  || !password) {
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
