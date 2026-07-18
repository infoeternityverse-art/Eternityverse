export const buildSort = ({ sort, order = 'desc' } = {}, allowedFields = ['createdAt']) => {
  const field = allowedFields.includes(sort) ? sort : 'createdAt';
  const direction = String(order).toLowerCase() === 'asc' ? 1 : -1;

  return {
    [field]: direction,
  };
};
