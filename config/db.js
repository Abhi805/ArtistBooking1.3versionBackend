import mongoose from 'mongoose';

let retryCount = 0;
const maxRetries = 5;
const retryDelay = 5000; // milliseconds

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {

      serverSelectionTimeoutMS: 5000,
      ssl: true // Set to false if you're not using MongoDB Atlas
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    retryCount = 0; // Reset after success
  } catch (err) {
    retryCount++;
    console.error(`❌ Connection attempt ${retryCount} failed: ${err.message}`);

    if (retryCount < maxRetries) {
      console.log(`🔁 Retrying in ${retryDelay / 1000} seconds...`);
      setTimeout(connectDB, retryDelay);
    } else {
      console.error('🚫 Max retry attempts reached. Exiting...');
      process.exit(1);
    }
  }
};


// Connection events
mongoose.connection.on('connected', () => {
  console.log('🔄 MongoDB reconnected');
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error(`❗ Mongoose runtime error: ${err.message}`);
});

// Export connection function and status checker
export const isConnected = () => mongoose.connection.readyState === 1;

export default connectDB;
