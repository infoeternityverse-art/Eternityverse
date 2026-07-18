import { Loader2 } from 'lucide-react';
import { cn } from './ui-utils.js';

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

/**
 * Spinner renders an accessible loading indicator for buttons, inline states, and panels.
 */
export function Spinner({ size = 'md', label = 'Loading', className = '' }) {
  return (
    <Loader2
      aria-label={label}
      role="status"
      className={cn('animate-spin text-current', sizes[size], className)}
    />
  );
}
