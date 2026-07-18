import bcrypt from 'bcrypt';
import { config } from '../config/index.js';

export const hashPassword = (password) => bcrypt.hash(password, config.bcryptSaltRounds);

export const comparePassword = (password, passwordHash) => bcrypt.compare(password, passwordHash);
