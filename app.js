import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';     // ✅ To load JWT_SECRET

// Load environment variables
dotenv.config();

import authRoutes from './routes/authRoutes.js';
;
import artistRoutes from './routes/artistRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import volunteerRoutes from './routes/volunteerRoutes.js';

const app = express();

// ✅ Enable CORS with credentials
app.use(cors({
  origin: "http://localhost:5173" || "http://localhost:5174",
  credentials: true
})); 

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/artists/booking', bookingRoutes);
app.use('/api/inquiry', inquiryRoutes);
app.use('/api/reviews', artistRoutes);
app.use('/api/volunteers',volunteerRoutes)

export default app;
