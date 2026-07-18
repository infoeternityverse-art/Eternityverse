export const buildServiceResponse = ({
  data = null,
  meta = undefined,
  message = 'Operation completed successfully.',
} = {}) => ({
  success: true,
  message,
  data,
  ...(meta ? { meta } : {}),
});

export const buildListResponse = ({ data = [], meta, message = 'Records fetched successfully.' }) =>
  buildServiceResponse({
    data,
    meta,
    message,
  });
