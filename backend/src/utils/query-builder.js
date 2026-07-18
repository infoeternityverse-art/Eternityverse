import { buildSearchFilter } from './search-builder.js';

const normalizeBoolean = (value) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
};

export const buildFilter = (filters = {}, allowedFields = []) =>
  Object.entries(filters).reduce((query, [field, value]) => {
    if (
      !allowedFields.includes(field) ||
      value === undefined ||
      value === null ||
      value === '' ||
      field === 'dateFrom' ||
      field === 'dateTo'
    ) {
      return query;
    }

    query[field] = normalizeBoolean(value);
    return query;
  }, {});

export const buildQuery = ({
  filters = {},
  search,
  searchFields = [],
  allowedFilters = [],
} = {}) => ({
  ...buildFilter(filters, allowedFilters),
  ...buildSearchFilter(search, searchFields),
});

export const buildFieldSelection = (fields, allowedFields = []) => {
  if (!fields) {
    return undefined;
  }

  const selectedFields = String(fields)
    .split(',')
    .map((field) => field.trim())
    .filter((field) => allowedFields.includes(field));

  return selectedFields.length > 0 ? selectedFields.join(' ') : undefined;
};

export const normalizePopulate = (populate = [], allowedPopulate = []) => {
  const requestedPopulate = Array.isArray(populate) ? populate : String(populate).split(',');

  return requestedPopulate
    .map((item) => String(item).trim())
    .filter((item) => allowedPopulate.includes(item));
};
