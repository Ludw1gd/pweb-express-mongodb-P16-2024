import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const mongoURI = process.env.MONGODB_URI as string;

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB Atlas successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas', error);
    process.exit(1); // Exit process with failure
  }
};
