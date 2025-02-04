import mongoose from 'mongoose';
import 'colors';

export const dbConnect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/test');
    console.log('Connected to MongoDB'.bgGreen.bold);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }

  const db = mongoose.connection;

  return db;
};