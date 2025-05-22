import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/admin.js';
import artistRoutes from './routes/artistRoutes.js';
import { protect } from './middleware/authMiddleware.js'; // correct path lagao
// import vendorRoutes from './routes/vendorRoutes.js';

const app = express();
app.use(cors({
  origin: "http://localhost:5173",  // ✅ React app ka origin
  credentials: true                 // ✅ Cookies allow karne ke liye
}));

app.use(express.json());
app.use(cookieParser());

// -------------------
// 🚀 API Routes
// -------------------
app.use('/api/auth',authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/artists', artistRoutes);
// app.use('/api/vendors', vendorRoutes);



app.get('/test-token', protect, (req, res) => {
  res.json({
    message: 'Token is valid',
    user: req.user,
  });
});



export default app;
