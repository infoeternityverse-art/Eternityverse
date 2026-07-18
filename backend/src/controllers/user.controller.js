import { userService } from '../services/index.js';
import { sendServiceResponse } from '../utils/controller-response.js';
import { asyncHandler } from '../utils/async-handler.js';
import { getQueryOptions } from '../utils/request-options.js';

export const listUsers = asyncHandler(async (req, res) => {
  const response = await userService.findMany(getQueryOptions(req.validated.query));
  return sendServiceResponse(res, response);
});

export const getUser = asyncHandler(async (req, res) => {
  const response = await userService.findById(req.validated.params.id);
  return sendServiceResponse(res, response);
});

export const updateUser = asyncHandler(async (req, res) => {
  if (req.validated.body.email) {
    await userService.ensureEmailAvailable(req.validated.body.email, req.validated.params.id);
  }

  const response = await userService.update(req.validated.params.id, req.validated.body);
  return sendServiceResponse(res, response);
});
