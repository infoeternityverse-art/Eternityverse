const RESERVED_QUERY_KEYS = new Set([
  'page',
  'limit',
  'sort',
  'order',
  'search',
  'fields',
  'populate',
]);

export const getQueryOptions = (query = {}) => {
  const filters = Object.entries(query).reduce((currentFilters, [key, value]) => {
    if (!RESERVED_QUERY_KEYS.has(key)) {
      currentFilters[key] = value;
    }

    return currentFilters;
  }, {});

  return {
    page: query.page,
    limit: query.limit,
    sort: query.sort,
    order: query.order,
    fields: query.fields,
    populate: query.populate,
    filters: {
      ...filters,
      search: query.search,
    },
  };
};
