import { Link, Outlet } from 'react-router-dom';
import { Bell, LogOut, Sparkles } from 'lucide-react';
import { APP_NAME } from '@/constants/app.constants.js';
import { customerNavigation } from '@/config/navigation.config.js';
import { Button } from '@/components/ui/index.js';
import { NavLink } from '@/components/common/nav-link.jsx';
import { useAuthStore } from '@/store/auth-store.js';

/**
 * CustomerDashboardLayout provides the customer sidebar, header, and content workspace.
 */
export function CustomerDashboardLayout() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="premium-shell text-white">
      <div className="flex min-h-screen gap-0 lg:p-4">
        <aside className="premium-glass hidden w-64 rounded-card p-5 lg:block">
          <Link to="/" className="mb-8 flex items-center gap-3 text-base font-black">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-button bg-brand-500 shadow-cyan">
              <Sparkles className="h-5 w-5" />
            </span>
            {APP_NAME}
          </Link>
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.18em] text-[#6C7693]">
            Workspace
          </p>
          <nav aria-label="Customer navigation" className="space-y-1">
            {customerNavigation.map((item) => (
              <NavLink key={item.href} item={item} compact />
            ))}
          </nav>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-white/10 bg-[#070B14]/72 px-4 py-4 backdrop-blur-2xl sm:px-6 lg:px-8 lg:mx-4 lg:mt-0 lg:rounded-card lg:border">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-accent-500">
                  <Sparkles className="h-4 w-4" />
                  Customer Dashboard
                </p>
                <p className="text-base font-bold text-white">Workspace</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="icon" aria-label="Notifications">
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
              aria-label="Customer mobile navigation"
              className="mt-4 flex gap-1 overflow-x-auto lg:hidden"
            >
              {customerNavigation.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </nav>
          </header>
          <main className="min-w-0 flex-1 px-4 py-10 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
