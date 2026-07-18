import { cn } from './ui-utils.js';

/**
 * Skeleton reserves space for loading content to prevent layout shift.
 */
export function Skeleton({ className = '', rounded = 'rounded-button' }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative overflow-hidden bg-white/[0.07] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-white/10',
        rounded,
        className
      )}
    />
  );
}
