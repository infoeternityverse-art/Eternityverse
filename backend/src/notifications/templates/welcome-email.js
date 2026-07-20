import { notificationConfig } from '../../config/notification.config.js';
import { renderButton } from './components/button.js';
import { renderDivider } from './components/divider.js';
import { escapeHtml } from './components/html.js';
import { emailTextStyles } from './components/text.js';
import { renderEmailLayout } from './layout/email-layout.js';

export const welcomeEmailTemplate = ({ user }) =>
  renderEmailLayout({
    title: `Welcome to ${notificationConfig.brandName}`,
    preview: 'Your GPU cloud marketplace account is ready.',
    children: `
      <h1 style="${emailTextStyles.heading}">Welcome, ${escapeHtml(user.name)}.</h1>
      <p style="${emailTextStyles.body}">Your ${notificationConfig.brandName} account is ready. You can browse GPU packages, track enquiries, and access issued credentials from your dashboard.</p>
      ${renderDivider()}
      ${renderButton({ href: notificationConfig.dashboardUrl, label: 'Open dashboard' })}
      <p style="${emailTextStyles.muted}">Our team manually reviews GPU access requests so your workload is matched with the right capacity.</p>
    `,
  });
