import { User, USER_ROLES } from '../models/index.js';
import { config } from '../config/index.js';
import { notificationConfig } from '../config/notification.config.js';
import { notificationService } from '../notifications/index.js';
import { ApiError } from '../utils/api-error.js';
import { comparePassword, hashPassword } from './password.service.js';
import {
  issueAuthTokens,
  signPasswordResetToken,
  verifyPasswordResetToken,
} from './token.service.js';

const sanitizeUser = (user) => user.toJSON();

const buildAuthResponse = (user) => ({
  user: sanitizeUser(user),
  tokens: issueAuthTokens(user),
});

export const registerCustomer = async ({ name, email, password }) => {
  const existingUser = await User.findByEmail(email);

  if (existingUser) {
    throw new ApiError(409, 'An account with this email already exists.');
  }

  const passwordHash = await hashPassword(password);
  const user = await User.create({
    name,
    email,
    passwordHash,
    role: USER_ROLES.CUSTOMER,
  });

  await notificationService.sendWelcomeEmail(user);

  return buildAuthResponse(user);
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email: String(email).toLowerCase().trim() }).select(
    '+passwordHash'
  );

  if (!user || !(await comparePassword(password, user.passwordHash))) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  if (!user.isActive) {
    throw new ApiError(403, 'This account is inactive.');
  }

  user.markLogin();
  await user.save();

  return buildAuthResponse(user);
};

export const loginAdmin = async ({ email, password }) => {
  const auth = await loginUser({ email, password });

  if (auth.user.role !== USER_ROLES.ADMIN) {
    throw new ApiError(403, 'Admin access required.');
  }

  return auth;
};

export const getCurrentUser = (user) => sanitizeUser(user);

export const updateCurrentUser = async (user, payload) => {
  if (payload.email) {
    const existingUser = await User.findByEmail(payload.email);

    if (existingUser && String(existingUser._id) !== String(user._id)) {
      throw new ApiError(409, 'An account with this email already exists.');
    }
  }

  Object.assign(user, payload);
  await user.save();

  await notificationService.sendProfileUpdated(user);

  return sanitizeUser(user);
};

export const changeCurrentUserPassword = async (user, { currentPassword, newPassword }) => {
  const userWithPassword = await User.findById(user._id).select('+passwordHash');

  if (!(await comparePassword(currentPassword, userWithPassword.passwordHash))) {
    throw new ApiError(401, 'Current password is incorrect.');
  }

  userWithPassword.passwordHash = await hashPassword(newPassword);
  await userWithPassword.save();

  await notificationService.sendPasswordChanged(userWithPassword);
};

export const requestPasswordReset = async ({ email }) => {
  const user = await User.findByEmail(email).select('+passwordHash');

  if (!user || !user.isActive) {
    return;
  }

  const token = signPasswordResetToken(user);
  const resetUrl = `${notificationConfig.frontendUrl}/reset-password?token=${encodeURIComponent(
    token
  )}&email=${encodeURIComponent(user.email)}`;

  await notificationService.sendPasswordReset({
    user,
    resetUrl,
    expiresIn: config.jwt.passwordResetExpiresIn,
  });
};

export const resetPassword = async ({ email, token, password }) => {
  const user = await User.findByEmail(email).select('+passwordHash');

  if (!user || !user.isActive) {
    throw new ApiError(400, 'Invalid or expired password reset link.');
  }

  try {
    const payload = verifyPasswordResetToken(token, user);

    if (payload.purpose !== 'password_reset' || payload.sub !== user._id.toString()) {
      throw new Error('Invalid password reset token.');
    }
  } catch {
    throw new ApiError(400, 'Invalid or expired password reset link.');
  }

  user.passwordHash = await hashPassword(password);
  await user.save();

  await notificationService.sendPasswordChanged(user);
};
