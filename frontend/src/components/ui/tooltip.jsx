import { cn } from './ui-utils.js';

/**
 * Tooltip shows short helper text on hover and focus while preserving keyboard access.
 */
export function Tooltip({ children, content, side = 'top', className = '' }) {
  const sides = {
    top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
    bottom: 'left-1/2 top-full mt-2 -translate-x-1/2',
    left: 'right-full top-1/2 mr-2 -translate-y-1/2',
    right: 'left-full top-1/2 ml-2 -translate-y-1/2',
  };

  return (
    <span className="group relative inline-flex">
      {children}
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute z-50 whitespace-nowrap rounded-button border border-white/10 bg-surface-elevated px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-glow backdrop-blur-xl transition duration-150 ease-premium group-focus-within:opacity-100 group-hover:opacity-100',
          sides[side],
          className
        )}
      >
        {content}
      </span>
    </span>
  );
}
