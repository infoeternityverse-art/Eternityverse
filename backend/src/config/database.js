import mongoose from 'mongoose';
import { config } from './index.js';

export const connectDatabase = async () => {
  mongoose.set('strictQuery', true);

  await mongoose.connect(config.mongoUri);
  console.log('MongoDB connected');
};
