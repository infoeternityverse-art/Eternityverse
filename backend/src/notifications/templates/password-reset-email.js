import { renderButton } from './components/button.js';
import { renderDivider } from './components/divider.js';
import { renderEmailLayout } from './layout/email-layout.js';

export const passwordResetEmailTemplate = ({ resetUrl, expiresIn }) =>
  renderEmailLayout({
    title: 'Reset your password',
    preview: 'Use the secure link to reset your password.',
    children: `
      <h1 style="margin:0 0 14px;font-size:30px;line-height:36px;color:#ffffff;">Reset your password.</h1>
      <p style="margin:0;color:#a6b0cf;font-size:16px;line-height:26px;">We received a request to reset your password. Use the secure link below. It expires in ${expiresIn}.</p>
      ${renderDivider()}
      ${renderButton({ href: resetUrl, label: 'Reset password' })}
      <p style="margin:24px 0 0;color:#6c7693;font-size:14px;line-height:22px;">If you did not request this, you can ignore this email.</p>
    `,
  });
