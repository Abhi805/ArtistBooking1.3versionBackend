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


// app.use(cors({
//   origin: "http://localhost:5173"  ,
//   credentials: true
// }));        

// const allowedOrigins = [
//     "https://artistbookinggnv-sxe2.vercel.app", // Vercel
//   "https://gnvindia.com",                     // Custom domain
//   "https://www.gnvindia.com",
//   "http://localhost:5173",               // With www
//   "https://artistbooking1-3versionbackend.onrender.com" ,

//   "https://artistbookinggnv-sxe2.vercel.app",  // ✅ Your frontend URL
//   "https://artistbooking1-3versionbackend.onrender.com"  // ✅ Optional: backend URL itself
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // if you're using cookies or auth headers
//   })
// );


const allowedOrigins = [
  "https://artistbookinggnv-sxe2.vercel.app", 
  "https://artistbooking1-3versionbackend.onrender.com" 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Important for cookies/auth headers
  })
);


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
