import { sendSuccess } from './api-response.js';

export const sendServiceResponse = (res, serviceResponse, statusCode = 200) =>
  sendSuccess(res, {
    statusCode,
    message: serviceResponse.message,
    data: serviceResponse.data,
    meta: serviceResponse.meta,
  });
