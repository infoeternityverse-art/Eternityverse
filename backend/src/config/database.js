import mongoose from 'mongoose';
import dns from 'node:dns';
import { config } from './index.js';

export const connectDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (config.mongoDnsServers.length > 0) {
    dns.setServers(config.mongoDnsServers);
  }

  await mongoose.connect(config.mongoUri);
  console.log('MongoDB connected');
};
