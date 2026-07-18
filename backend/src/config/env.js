import dotenv from 'dotenv';

dotenv.config();

export const loadEnv = (key, defaultValue = undefined) => {
  const value = process.env[key];

  if (value === undefined || value === '') {
    return defaultValue;
  }

  return value;
};

export const requireEnv = (key) => {
  const value = loadEnv(key);

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};
