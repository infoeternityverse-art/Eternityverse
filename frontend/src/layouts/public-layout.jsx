import { Link, Outlet } from 'react-router-dom';
import { Github, Linkedin, Sparkles, Twitter } from 'lucide-react';
import { APP_NAME } from '@/constants/app.constants.js';
import { authNavigation, footerNavigation, publicNavigation } from '@/config/navigation.config.js';
import { Button } from '@/components/ui/index.js';
import { NavLink } from '@/components/common/nav-link.jsx';

/**
 * PublicLayout provides the public navbar, constrained content container, and footer.
 */
export function PublicLayout() {
  return (
    <div className="premium-shell text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070B14]/72 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-base font-black tracking-normal">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-button bg-brand-500 shadow-cyan">
              <Sparkles className="h-4 w-4" />
            </span>
            {APP_NAME}
          </Link>
          <nav aria-label="Public navigation" className="flex flex-wrap gap-1">
            {publicNavigation.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>
          <div className="flex gap-2">
            <Button asChild variant="ghost">
              <Link to={authNavigation[0].href}>{authNavigation[0].label}</Link>
            </Button>
            <Button asChild>
              <Link to={authNavigation[1].href}>{authNavigation[1].label}</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto min-h-[calc(100vh-220px)] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer className="border-t border-white/10 bg-[#070B14]/80 backdrop-blur-xl">
        <div className="premium-divider" />
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-sm text-[#A6B0CF] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="font-semibold text-white">{APP_NAME}</p>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-4">
            {footerNavigation.map((item) => (
              <Link key={item.href} to={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-[#6C7693]" aria-label="Social links">
            <Github className="h-4 w-4" />
            <Twitter className="h-4 w-4" />
            <Linkedin className="h-4 w-4" />
          </div>
        </div>
      </footer>
    </div>
  );
}
