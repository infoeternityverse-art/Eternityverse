import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button.jsx';
import { cn } from './ui-utils.js';

/**
 * Pagination provides previous/next and compact page controls for paginated records.
 */
export function Pagination({
  page = 1,
  totalPages = 1,
  onPageChange,
  disabled = false,
  loading = false,
  className = '',
}) {
  const pages = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, index) => index + Math.max(1, Math.min(page - 2, totalPages - 4))
  );

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-between gap-3', className)}
    >
      <Button
        variant="outline"
        size="sm"
        disabled={disabled || loading || page <= 1}
        onClick={() => onPageChange?.(page - 1)}
        leftIcon={<ChevronLeft className="h-4 w-4" />}
      >
        Previous
      </Button>
      <div className="flex items-center gap-1">
        {pages.map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={pageNumber === page ? 'primary' : 'ghost'}
            size="sm"
            disabled={disabled || loading}
            aria-current={pageNumber === page ? 'page' : undefined}
            onClick={() => onPageChange?.(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        disabled={disabled || loading || page >= totalPages}
        onClick={() => onPageChange?.(page + 1)}
        rightIcon={<ChevronRight className="h-4 w-4" />}
      >
        Next
      </Button>
    </nav>
  );
}
