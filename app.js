

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
//  "https://www.gnvindia.com",
  // "https://gnvindia.com",
  // "http://localhost:5173",

  // "https://artistbookinggnv-sxe2.vercel.app", 
// const allowedOrigins = [
//   "https://gnvindia.com",

//     "https://artistbookinggnv-sxe2.vercel.app",
//     "https://artistbooking1-3versionbackend.onrender.com",  // ✅ Optional: backend URL itself
 
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
//     credentials: true, // Important for cookies/auth headers
//   })
// // );

// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import dotenv from 'dotenv';     // ✅ To load JWT_SECRET

// // Load environment variables
// dotenv.config();

// import authRoutes from './routes/authRoutes.js';


// import artistRoutes from './routes/artistRoutes.js';
// import bookingRoutes from './routes/bookingRoutes.js';
// import inquiryRoutes from './routes/inquiryRoutes.js';
// import volunteerRoutes from './routes/volunteerRoutes.js';

// const app = express();



// const allowedOrigins = [
//   "https://gnvindia.com",
//   "https://artistbookinggnv-sxe2.vercel.app",
//   "https://artistbooking1-3versionbackend.onrender.com"
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests from allowedOrigins or from tools like Postman (no origin)
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));




// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
// app.use("/public", express.static("public"));
// app.use('/api/auth', authRoutes);
// app.use('/api/artists', artistRoutes);
// app.use('/api/artists/booking', bookingRoutes);
// app.use('/api/inquiry', inquiryRoutes);
// app.use('/api/reviews', artistRoutes);
// app.use('/api/volunteers',volunteerRoutes)

// export default app;

   import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const allowedOrigins = [
   "http://localhost:5173",
  "https://gnvindia.com",
    "https://www.gnvindia.com", // ✅ Add this
  "https://artistbookinggnv-sxe2.vercel.app",
  "https://artistbooking1-3versionbackend.onrender.com"
];

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

app.use('/api/auth', authRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/artists/booking', bookingRoutes);
app.use('/api/inquiry', inquiryRoutes);
app.use('/api/reviews', artistRoutes);
app.use('/api/volunteers', volunteerRoutes);

export default app;
