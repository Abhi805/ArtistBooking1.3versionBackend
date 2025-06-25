
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
// import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();

const allowedOrigins = [
   "http://localhost:5173",
   "http://localhost:5174",
  "https://gnvindia.com",
  "https://www.gnvindia.com", // ✅ Add this
  "https://artistbookinggnv-sxe2.vercel.app",

];''

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

// Routes
import authRoutes from './routes/authRoutes.js';
import artistRoutes from './routes/artistRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import volunteerRoutes from './routes/volunteerRoutes.js';
import signupRoutes from './routes/signup/signupRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reachRoutes from './routes/reachRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import volunteerStatsRoutes from './routes/volunteerStatsRoutes.js';


app.use('/api/auth', authRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/artists/booking', bookingRoutes);
app.use('/api/inquiry', inquiryRoutes);
app.use('/api/reviews', artistRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/twilio', signupRoutes);
app.use('/api/fastsms', signupRoutes);
app.use('/api/roll', userRoutes);
app.use('/api/reach',reachRoutes);
app.use('/api/volunteer-stats',volunteerStatsRoutes);
app.use('/api/ratings',ratingRoutes);

export default app;
