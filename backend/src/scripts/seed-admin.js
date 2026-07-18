import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { loadEnv } from '../config/env.js';
import { User, USER_ROLES } from '../models/index.js';
import { hashPassword } from '../services/password.service.js';

const adminName = loadEnv('ADMIN_NAME', 'Admin');
const adminEmail = loadEnv('ADMIN_EMAIL');
const adminPassword = loadEnv('ADMIN_PASSWORD');

const fail = (message) => {
  console.error(message);
  process.exitCode = 1;
};

const seedAdmin = async () => {
  if (!adminEmail || !adminPassword) {
    fail('ADMIN_EMAIL and ADMIN_PASSWORD must be set in backend/.env.');
    return;
  }

  await connectDatabase();

  const existingAdmin = await User.findByEmail(adminEmail);
  const passwordHash = await hashPassword(adminPassword);

  if (existingAdmin) {
    existingAdmin.name = adminName;
    existingAdmin.role = USER_ROLES.ADMIN;
    existingAdmin.isActive = true;
    existingAdmin.passwordHash = passwordHash;
    await existingAdmin.save();
    console.log(`Admin user updated: ${adminEmail}`);
    return;
  }

  await User.create({
    name: adminName,
    email: adminEmail,
    role: USER_ROLES.ADMIN,
    isActive: true,
    passwordHash,
  });

  console.log(`Admin user created: ${adminEmail}`);
};

try {
  await seedAdmin();
} catch (error) {
  fail(error.message);
} finally {
  await mongoose.disconnect();
}
