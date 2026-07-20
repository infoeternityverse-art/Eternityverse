import { renderButton } from './components/button.js';
import { renderDivider } from './components/divider.js';
import { emailTextStyles } from './components/text.js';
import { renderEmailLayout } from './layout/email-layout.js';

export const passwordResetEmailTemplate = ({ resetUrl, expiresIn }) =>
  renderEmailLayout({
    title: 'Reset your password',
    preview: 'Use the secure link to reset your password.',
    children: `
      <h1 style="${emailTextStyles.heading}">Reset your password.</h1>
      <p style="${emailTextStyles.body}">We received a request to reset your password. Use the secure link below. It expires in ${expiresIn}.</p>
      ${renderDivider()}
      ${renderButton({ href: resetUrl, label: 'Reset password' })}
      <p style="${emailTextStyles.muted}">If you did not request this, you can ignore this email.</p>
    `,
  });
