import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store.js';
import { AUTH_SESSION_EXPIRED_EVENT } from '@/utils/token-storage.js';

/**
 * SessionRestore restores a persisted auth session once when the application starts.
 */
export function SessionRestore({ children }) {
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const clearSession = useAuthStore((state) => state.clearSession);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, clearSession);
    return () => window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, clearSession);
  }, [clearSession]);

  return children;
}
