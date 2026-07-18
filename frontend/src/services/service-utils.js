const removeEmptyValues = (params = {}) =>
  Object.entries(params).reduce((currentParams, [key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      currentParams[key] = value;
    }

    return currentParams;
  }, {});

export const normalizeApiData = (response) => response.data.data;

export const normalizeApiList = (response) => ({
  data: response.data.data,
  meta: response.data.meta,
  message: response.data.message,
});

export const buildRequestConfig = (params = {}) => ({
  params: removeEmptyValues(params),
});
