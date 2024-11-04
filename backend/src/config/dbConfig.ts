// src/config/dbConfig.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await mongoose.connect(process.env.MONGO_URI || '');
      console.log('MongoDB connected successfully');
      break;
    } catch (error) {
      retries += 1;
      if (error instanceof Error) {
        console.error(`MongoDB connection failed (attempt ${retries}): ${error.message}`);
      } else {
        console.error(`MongoDB connection failed (attempt ${retries}): ${error}`);
      }
      if (retries < maxRetries) {
        console.log('Retrying MongoDB connection in 5 seconds...');
        await new Promise((resolve) => setTimeout(resolve, 5000));
      } else {
        console.error('Max retries reached. Exiting...');
        process.exit(1);
      }
    }
  }
};

export default connectDB;
