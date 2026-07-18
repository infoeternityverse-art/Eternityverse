export const cn = (...classes) => classes.filter(Boolean).join(' ');

export const sizeClasses = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-11 px-4 text-sm',
  lg: 'h-[52px] min-h-[52px] px-6 text-base',
};

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-page';

export const disabledClasses = 'disabled:cursor-not-allowed disabled:opacity-50';

export const fieldBase =
  'w-full rounded-field border border-white/10 bg-white/[0.055] text-white placeholder:text-[#6C7693] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur transition duration-200 ease-premium hover:border-white/20 focus:border-accent-500/70 focus:shadow-[0_0_0_4px_rgba(0,212,255,0.08)]';

export const fieldError =
  'border-red-500/70 text-red-100 focus:border-red-400 focus-visible:ring-red-500/70';
