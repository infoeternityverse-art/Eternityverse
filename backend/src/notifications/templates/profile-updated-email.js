import { escapeHtml } from './components/html.js';
import { emailTextStyles } from './components/text.js';
import { renderEmailLayout } from './layout/email-layout.js';

export const profileUpdatedEmailTemplate = ({ user }) =>
  renderEmailLayout({
    title: 'Profile updated',
    preview: 'Your profile information was updated.',
    children: `
      <h1 style="${emailTextStyles.heading}">Profile updated.</h1>
      <p style="${emailTextStyles.body}">Hi ${escapeHtml(user.name)}, your account profile was updated successfully.</p>
    `,
  });
