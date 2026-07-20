import { useEffect } from 'react';
import { useUiStore } from '@/store/ui-store.js';

/**
 * ThemeSync applies the persisted visual theme to the document root.
 */
export function ThemeSync() {
  const initializeTheme = useUiStore((state) => state.initializeTheme);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return null;
}
