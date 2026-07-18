export const getId = (record) => record?.id || record?._id;

export const formatDate = (value) => {
  if (!value) return '-';
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
};

export const formatMoney = (value, currency = 'USD') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));

export const parseSortValue = (value) => {
  const [sort = 'createdAt', order = 'desc'] = String(value || 'createdAt:desc').split(':');
  return { sort, order };
};
