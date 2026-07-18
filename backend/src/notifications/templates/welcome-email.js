import { notificationConfig } from '../../config/notification.config.js';
import { renderButton } from './components/button.js';
import { renderDivider } from './components/divider.js';
import { escapeHtml } from './components/html.js';
import { renderEmailLayout } from './layout/email-layout.js';

export const welcomeEmailTemplate = ({ user }) =>
  renderEmailLayout({
    title: `Welcome to ${notificationConfig.brandName}`,
    preview: 'Your GPU cloud marketplace account is ready.',
    children: `
      <h1 style="margin:0 0 14px;font-size:32px;line-height:38px;color:#ffffff;">Welcome, ${escapeHtml(user.name)}.</h1>
      <p style="margin:0;color:#a6b0cf;font-size:16px;line-height:26px;">Your ${notificationConfig.brandName} account is ready. You can browse GPU packages, track enquiries, and access issued credentials from your dashboard.</p>
      ${renderDivider()}
      ${renderButton({ href: notificationConfig.dashboardUrl, label: 'Open dashboard' })}
      <p style="margin:24px 0 0;color:#6c7693;font-size:14px;line-height:22px;">Our team manually reviews GPU access requests so your workload is matched with the right capacity.</p>
    `,
  });
