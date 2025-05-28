import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';     // ✅ To load JWT_SECRET

// Load environment variables
dotenv.config();

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/admin.js';
import artistRoutes from './routes/artistRoutes.js';

const app = express();

// ✅ Enable CORS with credentials
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ------------------- 
// 🚀 API Routes
// ------------------- 
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/artists', artistRoutes);


export default app;
