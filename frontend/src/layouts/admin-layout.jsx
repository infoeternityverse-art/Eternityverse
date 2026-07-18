import { Link, Outlet } from 'react-router-dom';
import { Bell, LogOut, ShieldCheck, Sparkles } from 'lucide-react';
import { APP_NAME } from '@/constants/app.constants.js';
import { adminNavigation } from '@/config/navigation.config.js';
import { Button, ToastViewport } from '@/components/ui/index.js';
import { NavLink } from '@/components/common/nav-link.jsx';
import { useAuthStore } from '@/store/auth-store.js';

/**
 * AdminLayout provides admin navigation, header, content area, and notification viewport.
 */
export function AdminLayout() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="premium-shell text-white">
      <div className="flex min-h-screen gap-0 xl:p-4">
        <aside className="premium-glass hidden w-72 rounded-card p-5 xl:block">
          <Link to="/admin" className="mb-8 flex items-center gap-3 text-base font-black">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-button bg-brand-500 shadow-cyan">
              <ShieldCheck className="h-5 w-5 text-white" />
            </span>
            {APP_NAME} Admin
          </Link>
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.18em] text-[#6C7693]">
            Console
          </p>
          <nav aria-label="Admin navigation" className="space-y-1">
            {adminNavigation.map((item) => (
              <NavLink key={item.href} item={item} compact />
            ))}
          </nav>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-white/10 bg-[#070B14]/72 px-4 py-4 backdrop-blur-2xl sm:px-6 lg:px-8 xl:mx-4 xl:mt-0 xl:rounded-card xl:border">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-accent-500">
                  <Sparkles className="h-4 w-4" />
                  Admin Console
                </p>
                <p className="text-base font-bold text-white">Operations</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="icon" aria-label="Admin notifications">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  leftIcon={<LogOut className="h-4 w-4" />}
                >
                  Logout
                </Button>
              </div>
            </div>
            <nav
              aria-label="Admin mobile navigation"
              className="mt-4 flex gap-1 overflow-x-auto xl:hidden"
            >
              {adminNavigation.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </nav>
          </header>
          <main className="min-w-0 flex-1 px-4 py-10 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
      <ToastViewport />
    </div>
  );
}
