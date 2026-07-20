import { Moon, Sun } from 'lucide-react';
import { useUiStore } from '@/store/ui-store.js';

/**
 * ThemeToggle switches the full application between dark and light visual modes.
 */
export function ThemeToggle() {
  const theme = useUiStore((state) => state.theme);
  const toggleTheme = useUiStore((state) => state.toggleTheme);
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-pressed={isLight}
      onClick={toggleTheme}
      className="theme-toggle group relative inline-flex h-11 w-[96px] items-center justify-between overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.055] p-1 text-white shadow-[0_14px_42px_rgba(0,0,0,0.22)] backdrop-blur-xl transition duration-300 ease-premium hover:border-brand-500/50"
    >
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_72%_30%,rgba(172,126,231,0.34),transparent_36%)] opacity-80 transition duration-300 group-hover:opacity-100" />
      <span
        className={`absolute top-1 h-9 w-11 rounded-[14px] bg-brand-500 shadow-[0_10px_32px_rgba(172,126,231,0.42)] transition duration-300 ease-premium ${
          isLight ? 'left-[48px]' : 'left-1'
        }`}
      />
      <span className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/70 shadow-[0_0_18px_rgba(172,126,231,0.9)]" />
      <span className="relative z-10 grid h-9 w-11 place-items-center rounded-[14px]">
        <Moon className={`h-4 w-4 transition ${isLight ? 'opacity-45' : 'opacity-100'}`} />
      </span>
      <span className="relative z-10 grid h-9 w-11 place-items-center rounded-[14px]">
        <Sun className={`h-4 w-4 transition ${isLight ? 'opacity-100' : 'opacity-45'}`} />
      </span>
    </button>
  );
}
