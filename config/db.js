import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {

      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ Initial MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
};

// 🔁 Reconnect notifier
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('🔄 MongoDB reconnected');
});

mongoose.connection.on('error', (err) => {
  console.error(`❗ Mongoose runtime error: ${err.message}`);
});

// ✅ Optional: check isConnected status
export const isConnected = () => mongoose.connection.readyState === 1;

export default connectDB;
