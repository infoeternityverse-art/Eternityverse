import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Alert } from './alert.jsx';
import { Button } from './button.jsx';
import { cn } from './ui-utils.js';

/**
 * Toast renders one transient notification with an optional close action.
 */
export function Toast({ title, description, variant = 'info', onClose, className = '' }) {
  return (
    <motion.div
      className={cn('pointer-events-auto w-full max-w-sm', className)}
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      <Alert title={title} variant={variant}>
        <div className="flex items-start justify-between gap-3">
          {description && <p>{description}</p>}
          {onClose && (
            <Button aria-label="Close toast" variant="icon" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Alert>
    </motion.div>
  );
}

/**
 * ToastViewport positions a stack of toast notifications without owning toast state.
 */
export function ToastViewport({ children, position = 'top-right', className = '' }) {
  const positions = {
    'top-right': 'right-4 top-4',
    'top-left': 'left-4 top-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  return (
    <div className={cn('fixed z-50 flex flex-col gap-3', positions[position], className)}>
      {children}
    </div>
  );
}
