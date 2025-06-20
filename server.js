import dotenv from 'dotenv';
dotenv.config(); // ✅ Load environment variables at the top

import app from './app.js';
import connectDB from './config/db.js';

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    process.exit(1);
});
 
// Connect to DB first, then start the server
const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`✅ Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Failed to connect to DB or start server:', error.message);
        process.exit(1);
    }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err.message);
    process.exit(1);
});
