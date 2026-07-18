import { AlertCircle, CheckCircle, Info, TriangleAlert, X } from 'lucide-react';
import { Button } from './button.jsx';
import { cn } from './ui-utils.js';

const variants = {
  info: 'border-accent-500/25 bg-accent-500/10 text-cyan-100 shadow-cyan',
  success:
    'border-emerald-400/25 bg-emerald-400/10 text-emerald-100 shadow-[0_0_30px_rgba(34,197,94,0.10)]',
  warning: 'border-amber-400/25 bg-amber-400/10 text-amber-100',
  danger: 'border-red-400/25 bg-red-400/10 text-red-100',
};

const icons = {
  info: Info,
  success: CheckCircle,
  warning: TriangleAlert,
  danger: AlertCircle,
};

/**
 * Alert presents persistent contextual feedback with optional dismiss behavior.
 */
export function Alert({ title, children, variant = 'info', onDismiss, className = '' }) {
  const Icon = icons[variant];

  return (
    <div
      role="alert"
      className={cn(
        'flex gap-3 rounded-card border p-5 backdrop-blur-xl',
        variants[variant],
        className
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className="mt-1 text-sm opacity-90">{children}</div>}
      </div>
      {onDismiss && (
        <Button aria-label="Dismiss alert" variant="icon" size="sm" onClick={onDismiss}>
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
