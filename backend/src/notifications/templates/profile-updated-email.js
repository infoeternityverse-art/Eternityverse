import { escapeHtml } from './components/html.js';
import { renderEmailLayout } from './layout/email-layout.js';

export const profileUpdatedEmailTemplate = ({ user }) =>
  renderEmailLayout({
    title: 'Profile updated',
    preview: 'Your profile information was updated.',
    children: `
      <h1 style="margin:0 0 14px;font-size:30px;line-height:36px;color:#ffffff;">Profile updated.</h1>
      <p style="margin:0;color:#a6b0cf;font-size:16px;line-height:26px;">Hi ${escapeHtml(user.name)}, your account profile was updated successfully.</p>
    `,
  });
