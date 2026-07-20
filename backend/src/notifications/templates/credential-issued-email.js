import { notificationConfig } from '../../config/notification.config.js';
import { renderButton } from './components/button.js';
import { renderDivider } from './components/divider.js';
import { escapeHtml } from './components/html.js';
import { emailTextStyles, renderField } from './components/text.js';
import { renderEmailLayout } from './layout/email-layout.js';

export const credentialIssuedEmailTemplate = ({ credential, gpuPackage }) =>
  renderEmailLayout({
    title: 'GPU credentials issued',
    preview: 'Your GPU access credentials are available in your dashboard.',
    children: `
      <h1 style="${emailTextStyles.heading}">Your GPU access is ready.</h1>
      <p style="${emailTextStyles.body}">Credentials have been issued for your approved request. For security, passwords are never sent by email.</p>
      ${renderDivider()}
      ${renderField({ label: 'GPU Package', value: escapeHtml(gpuPackage?.name || 'Assigned GPU package') })}
      ${renderField({ label: 'Host', value: escapeHtml(credential.host) })}
      ${renderDivider()}
      ${renderButton({ href: `${notificationConfig.dashboardUrl}/credentials`, label: 'Open credentials securely' })}
    `,
  });
