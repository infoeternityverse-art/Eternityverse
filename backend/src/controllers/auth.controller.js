import {
  getCurrentUser,
  changeCurrentUserPassword,
  loginAdmin,
  loginUser,
  registerCustomer,
  updateCurrentUser,
} from '../services/auth.service.js';
import { sendSuccess } from '../utils/api-response.js';
import { asyncHandler } from '../utils/async-handler.js';

export const register = asyncHandler(async (req, res) => {
  const data = await registerCustomer(req.validated.body);

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Registration successful.',
    data,
  });
});

export const login = asyncHandler(async (req, res) => {
  const data = await loginUser(req.validated.body);

  return sendSuccess(res, {
    message: 'Login successful.',
    data,
  });
});

export const adminLogin = asyncHandler(async (req, res) => {
  const data = await loginAdmin(req.validated.body);

  return sendSuccess(res, {
    message: 'Admin login successful.',
    data,
  });
});

export const logout = asyncHandler(async (req, res) =>
  sendSuccess(res, {
    message: 'Logout successful.',
    data: null,
  })
);

export const me = asyncHandler(async (req, res) =>
  sendSuccess(res, {
    message: 'Current user fetched successfully.',
    data: {
      user: getCurrentUser(req.user),
    },
  })
);

export const updateMe = asyncHandler(async (req, res) => {
  const user = await updateCurrentUser(req.user, req.validated.body);

  return sendSuccess(res, {
    message: 'Profile updated successfully.',
    data: { user },
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  await changeCurrentUserPassword(req.user, req.validated.body);

  return sendSuccess(res, {
    message: 'Password updated successfully.',
    data: null,
  });
});
