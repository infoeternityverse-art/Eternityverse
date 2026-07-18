import { User } from 'lucide-react';
import { cn } from './ui-utils.js';

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

/**
 * Avatar displays a user image, initials, or fallback icon in a stable frame.
 */
export function Avatar({ src, alt = '', name = '', size = 'md', className = '' }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-brand-500 font-bold text-white shadow-cyan',
        sizes[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt || name} className="h-full w-full object-cover" />
      ) : (
        initials || <User className="h-1/2 w-1/2" />
      )}
    </span>
  );
}
