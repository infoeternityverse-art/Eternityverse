export const sendSuccess = (
  res,
  { statusCode = 200, message = 'Request completed successfully.', data = null, meta = undefined }
) => {
  const payload = {
    success: true,
    message,
    data,
  };

  if (meta) {
    payload.meta = meta;
  }

  return res.status(statusCode).json(payload);
};

export const sendError = (
  res,
  { statusCode = 500, message = 'Internal server error.', errors = [] }
) =>
  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
