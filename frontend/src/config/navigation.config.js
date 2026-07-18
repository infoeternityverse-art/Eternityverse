import {
  Boxes,
  CircleHelp,
  ClipboardList,
  Contact,
  FileClock,
  Gauge,
  Home,
  KeyRound,
  LayoutDashboard,
  PackagePlus,
  ShieldCheck,
  User,
  Users,
} from 'lucide-react';

/**
 * Navigation config keeps route labels and menu structure out of layout components.
 */
export const publicNavigation = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'GPUs', href: '/gpus', icon: Boxes },
  { label: 'About', href: '/about', icon: CircleHelp },
  { label: 'FAQ', href: '/faq', icon: CircleHelp },
  { label: 'Contact', href: '/contact', icon: Contact },
];

export const authNavigation = [
  { label: 'Login', href: '/login' },
  { label: 'Register', href: '/register' },
];

export const customerNavigation = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Enquiries', href: '/dashboard/enquiries', icon: ClipboardList },
  { label: 'Credentials', href: '/dashboard/credentials', icon: KeyRound },
  { label: 'Profile', href: '/dashboard/profile', icon: User },
];

export const adminNavigation = [
  { label: 'Overview', href: '/admin', icon: Gauge },
  { label: 'GPU Packages', href: '/admin/gpu-packages', icon: PackagePlus },
  { label: 'Enquiries', href: '/admin/enquiries', icon: ClipboardList },
  { label: 'Credentials', href: '/admin/credentials', icon: KeyRound },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Audit Logs', href: '/admin/audit-logs', icon: FileClock },
];

export const adminUtilityNavigation = [
  { label: 'Admin Login', href: '/admin/login', icon: ShieldCheck },
];

export const footerNavigation = [
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Login', href: '/login' },
];

export const breadcrumbLabels = {
  '/': 'Home',
  '/gpus': 'GPUs',
  '/enquiry': 'Enquiry',
  '/thank-you': 'Thank You',
  '/login': 'Login',
  '/register': 'Register',
  '/contact': 'Contact',
  '/about': 'About',
  '/faq': 'FAQ',
  '/dashboard': 'Dashboard',
  '/dashboard/enquiries': 'Enquiries',
  '/dashboard/credentials': 'Credentials',
  '/dashboard/profile': 'Profile',
  '/admin': 'Admin',
  '/admin/login': 'Admin Login',
  '/admin/gpu-packages': 'GPU Packages',
  '/admin/gpu-packages/new': 'New Package',
  '/admin/enquiries': 'Enquiries',
  '/admin/credentials': 'Credentials',
  '/admin/customers': 'Customers',
  '/admin/audit-logs': 'Audit Logs',
  '/403': 'Forbidden',
  '/500': 'Server Error',
};
