import { cloneElement, isValidElement } from 'react';
import { motion } from 'framer-motion';
import { Spinner } from './spinner.jsx';
import { cn, disabledClasses, focusRing, sizeClasses } from './ui-utils.js';

const variants = {
  primary:
    'bg-brand-500 text-white shadow-[0_10px_32px_rgba(172,126,231,0.30)] hover:bg-brand-600 hover:shadow-[0_14px_46px_rgba(172,126,231,0.28)]',
  secondary:
    'border border-white/10 bg-white/[0.075] text-white backdrop-blur hover:border-white/20 hover:bg-white/[0.11]',
  outline:
    'border border-white/15 bg-transparent text-white hover:border-brand-500/60 hover:bg-brand-500/10',
  ghost: 'text-[#A6B0CF] hover:bg-white/[0.075] hover:text-white',
  link: 'h-auto px-0 text-brand-500 underline-offset-4 hover:text-white hover:underline',
  success:
    'bg-emerald-500 text-white shadow-[0_10px_34px_rgba(34,197,94,0.22)] hover:bg-emerald-400',
  danger: 'bg-red-500 text-white shadow-[0_10px_34px_rgba(239,68,68,0.22)] hover:bg-red-400',
  icon: 'border border-transparent text-[#A6B0CF] hover:border-white/10 hover:bg-white/[0.075] hover:text-white',
};

const iconSizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

/**
 * Button is the shared action primitive with visual variants, loading state, and icon support.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  asChild = false,
  type = 'button',
  className = '',
  ...props
}) {
  const isIcon = variant === 'icon';
  const classes = cn(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-button font-semibold tracking-normal transition duration-200 ease-premium',
    focusRing,
    disabledClasses,
    variants[variant],
    isIcon ? iconSizes[size] : sizeClasses[size],
    className
  );
  const content = (
    <>
      {loading ? <Spinner size={size === 'lg' ? 'md' : 'sm'} /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </>
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      className: cn(classes, children.props.className),
      'aria-disabled': disabled || loading || undefined,
      ...props,
    });
  }

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      className={classes}
      whileHover={disabled || loading ? undefined : { y: -1 }}
      whileTap={disabled || loading ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      {...props}
    >
      {content}
    </motion.button>
  );
}
