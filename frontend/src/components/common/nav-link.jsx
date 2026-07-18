import { NavLink as RouterNavLink } from 'react-router-dom';
import { cn, focusRing } from '@/components/ui/ui-utils.js';

/**
 * NavLink centralizes active and focus styling for layout navigation.
 */
export function NavLink({ item, compact = false }) {
  const Icon = item.icon;

  return (
    <RouterNavLink
      to={item.href}
      end={item.href === '/' || item.href === '/dashboard' || item.href === '/admin'}
      className={({ isActive }) =>
        cn(
          'inline-flex items-center gap-2 rounded-button px-3 py-2 text-sm font-semibold transition duration-200 ease-premium',
          focusRing,
          isActive
            ? 'bg-brand-500 text-white shadow-[0_10px_30px_rgba(129,74,200,0.24)]'
            : 'text-[#A6B0CF] hover:bg-white/[0.075] hover:text-white',
          compact && 'w-full'
        )
      }
    >
      {Icon && <Icon className="h-4 w-4" />}
      {item.label}
    </RouterNavLink>
  );
}
