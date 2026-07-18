import { Badge } from './badge.jsx';

const statusVariantMap = {
  active: 'success',
  available: 'success',
  success: 'success',
  pending: 'warning',
  warning: 'warning',
  inactive: 'neutral',
  disabled: 'neutral',
  revoked: 'danger',
  rejected: 'danger',
  error: 'danger',
};

/**
 * StatusBadge maps common status values to accessible badge colors.
 */
export function StatusBadge({ status, label, size = 'md', className = '' }) {
  const normalizedStatus = String(status || 'neutral').toLowerCase();
  const variant = statusVariantMap[normalizedStatus] || 'neutral';

  return (
    <Badge variant={variant} size={size} className={className}>
      {label || normalizedStatus}
    </Badge>
  );
}
