import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './button.jsx';
import { cn } from './ui-utils.js';

/**
 * Drawer renders a slide-in panel controlled by parent state for secondary workflows.
 */
export function Drawer({ open, title, children, footer, side = 'right', onClose, className = '' }) {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousActiveElement = document.activeElement;
    drawerRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousActiveElement?.focus?.();
    };
  }, [onClose, open]);

  if (!open) return null;

  const sides = {
    right: 'right-0 top-0 h-full w-full max-w-md',
    left: 'left-0 top-0 h-full w-full max-w-md',
    bottom: 'bottom-0 left-0 max-h-[85vh] w-full',
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#070B14]/75 backdrop-blur-md"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.16 }}
    >
      <motion.aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        tabIndex={-1}
        className={cn(
          'fixed border-white/10 bg-surface text-white shadow-glow backdrop-blur-2xl',
          sides[side],
          className
        )}
        initial={side === 'bottom' ? { y: 24 } : { x: side === 'left' ? -24 : 24 }}
        animate={side === 'bottom' ? { y: 0 } : { x: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          {title && (
            <h2 id="drawer-title" className="text-xl font-extrabold text-white">
              {title}
            </h2>
          )}
          {onClose && (
            <Button aria-label="Close drawer" variant="icon" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="overflow-auto p-6">{children}</div>
        {footer && <div className="border-t border-white/10 p-6">{footer}</div>}
      </motion.aside>
    </motion.div>
  );
}
