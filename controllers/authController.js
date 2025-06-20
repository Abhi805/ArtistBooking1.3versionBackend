import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { sendMail } from "../utils/mailHelper.js";

//register functionlity

export const registerUser = async (req, res) => {
  try {
    const { fullName, mobileNumber, email, password, confirmPassword,username,role } =
      req.body;



    if (password !== confirmPassword)
      return res.status(400).json({ msg: "Passwords do not match" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

      const existingName = await User.findOne({ username });
    if (existingName)
      return res.status(400).json({ msg: "username already exists" });

    const existingUserNumber = await User.findOne({ mobileNumber });
    if (existingUserNumber) {
      return res.status(400).json({ msg: "Mobile number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    // validate role
    if (!["artist", "volunteer", "admin"].includes(role)) {
      return res.status(400).json({ msg: "Invalid role specified" });
    }
    const newUser = new User({
      fullName,
      mobileNumber,
      username,
      email,
      password: hashedPassword,
      role,// 👈 force all new users to be normal users
    });

    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {

    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

//Login functionlity

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id,   email: user.email, role: user.role }, // include role here
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};


export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body; // get role from frontend

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // ✅ Check if selected role matches the user's actual role
    if (role && user.role !== role) {
      return res.status(403).json({ msg: `Role mismatch: You are not a ${role}` });
    }

    const token = generateToken(user);

    // devlopment
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });



// production
    // res.cookie("token", token, {
    //    httpOnly: true,
    //    secure: true,
    //    sameSite: "None", 
    //    maxAge: 24 * 60 * 60 * 1000,
    //  });


    res.status(200).json({
      msg: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

    console.log("Login successful");
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};


export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "Logged out successfully" });
};
