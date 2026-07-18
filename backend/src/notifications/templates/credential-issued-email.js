import { notificationConfig } from '../../config/notification.config.js';
import { renderButton } from './components/button.js';
import { renderDivider } from './components/divider.js';
import { escapeHtml } from './components/html.js';
import { renderEmailLayout } from './layout/email-layout.js';

export const credentialIssuedEmailTemplate = ({ credential, gpuPackage }) =>
  renderEmailLayout({
    title: 'GPU credentials issued',
    preview: 'Your GPU access credentials are available in your dashboard.',
    children: `
      <h1 style="margin:0 0 14px;font-size:30px;line-height:36px;color:#ffffff;">Your GPU access is ready.</h1>
      <p style="margin:0;color:#a6b0cf;font-size:16px;line-height:26px;">Credentials have been issued for your approved request. For security, passwords are never sent by email.</p>
      ${renderDivider()}
      <p style="margin:0 0 10px;color:#ffffff;font-weight:700;">GPU Package</p>
      <p style="margin:0 0 18px;color:#a6b0cf;">${escapeHtml(gpuPackage?.name || 'Assigned GPU package')}</p>
      <p style="margin:0 0 10px;color:#ffffff;font-weight:700;">Host</p>
      <p style="margin:0;color:#a6b0cf;">${escapeHtml(credential.host)}</p>
      ${renderDivider()}
      ${renderButton({ href: `${notificationConfig.dashboardUrl}/credentials`, label: 'Open credentials securely' })}
    `,
  });
