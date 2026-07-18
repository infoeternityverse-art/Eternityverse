import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Github, Linkedin, Mail, Menu, Twitter, X, Youtube } from 'lucide-react';
import { APP_NAME } from '@/constants/app.constants.js';
import { authNavigation, footerNavigation, publicNavigation } from '@/config/navigation.config.js';
import { env } from '@/config/env.js';
import { Button } from '@/components/ui/index.js';
import { NavLink } from '@/components/common/nav-link.jsx';
import { BrandMark } from '@/components/common/brand-mark.jsx';

/**
 * PublicLayout provides the public navbar, constrained content container, and footer.
 */
export function PublicLayout() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const closeMobileNav = () => setIsMobileNavOpen(false);
  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com', icon: Github },
    { label: 'X', href: 'https://x.com', icon: Twitter },
    { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: Linkedin },
    { label: 'YouTube', href: 'https://www.youtube.com', icon: Youtube },
  ];
  const pageLinks = [
    { label: 'GPU Marketplace', href: '/gpus' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ];
  const legalLinks = [
    { label: 'Privacy Policy', href: '/faq' },
    { label: 'Terms of Access', href: '/faq' },
    { label: 'Security', href: '/faq' },
    { label: 'Acceptable Use', href: '/faq' },
  ];

  return (
    <div className="premium-shell flex min-h-screen flex-col text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/75 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link
              to="/"
              onClick={closeMobileNav}
              className="flex items-center gap-2 text-base font-black tracking-normal"
            >
              <BrandMark />
              {APP_NAME}
            </Link>

            <div className="hidden items-center gap-6 lg:flex">
              <nav aria-label="Public navigation" className="flex items-center gap-1">
                {publicNavigation.map((item) => (
                  <NavLink key={item.href} item={item} />
                ))}
              </nav>
              <Button
                asChild
                variant="outline"
                className="border-brand-500/30 bg-white/[0.035] px-5 hover:bg-brand-500/15"
              >
                <Link to={authNavigation[0].href}>{authNavigation[0].label}</Link>
              </Button>
            </div>

            <Button
              variant="icon"
              className="lg:hidden"
              aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileNavOpen}
              onClick={() => setIsMobileNavOpen((current) => !current)}
            >
              {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {isMobileNavOpen && (
            <div className="border-t border-white/10 py-4 lg:hidden">
              <nav aria-label="Mobile public navigation" className="flex flex-col gap-1">
                {publicNavigation.map((item) => (
                  <NavLink key={item.href} item={item} compact onClick={closeMobileNav} />
                ))}
              </nav>
              <div className="mt-4">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-center border-brand-500/30 bg-white/[0.035]"
                >
                  <Link to={authNavigation[0].href} onClick={closeMobileNav}>
                    {authNavigation[0].label}
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="mt-auto border-t border-white/10 bg-black">
        <div className="premium-divider" />
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr_0.9fr]">
            <div className="max-w-md space-y-5">
              <Link
                to="/"
                className="inline-flex items-center gap-3 text-lg font-black tracking-normal text-white"
              >
                <BrandMark className="h-10 w-10" />
                {APP_NAME}
              </Link>
              <p className="text-sm leading-6 text-[#A6B0CF]">
                A professional GPU cloud marketplace for browsing packages, submitting reviewed
                enquiries, and receiving credentials through a controlled admin workflow.
              </p>
              <a
                href={`mailto:${env.supportEmail}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-brand-500"
              >
                <Mail className="h-4 w-4" />
                {env.supportEmail}
              </a>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Explore</h2>
              <nav aria-label="Footer navigation" className="grid gap-3 text-sm text-[#A6B0CF]">
                {footerNavigation.map((item) => (
                  <Link key={item.href} to={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Pages</h2>
              <nav aria-label="Footer pages" className="grid gap-3 text-sm text-[#A6B0CF]">
                {pageLinks.map((item) => (
                  <Link key={item.href} to={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Legal</h2>
              <nav aria-label="Footer legal" className="grid gap-3 text-sm text-[#A6B0CF]">
                {legalLinks.map((item) => (
                  <Link key={item.label} to={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Social</h2>
              <div className="flex flex-wrap gap-3" aria-label="Social links">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-button border border-white/10 bg-white/[0.035] text-[#A6B0CF] transition hover:border-brand-500/60 hover:text-white"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
              <p className="max-w-xs text-sm leading-6 text-[#A6B0CF]">
                Follow platform updates, product progress, and GPU marketplace announcements.
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-sm text-[#6C7693]">
            <p>
              © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
