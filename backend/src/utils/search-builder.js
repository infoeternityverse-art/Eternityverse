const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const buildSearchFilter = (search, fields = []) => {
  if (!search || fields.length === 0) {
    return {};
  }

  const expression = new RegExp(escapeRegex(search.trim()), 'i');

  return {
    $or: fields.map((field) => ({ [field]: expression })),
  };
};
