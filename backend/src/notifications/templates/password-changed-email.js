import { emailTextStyles } from './components/text.js';
import { renderEmailLayout } from './layout/email-layout.js';

export const passwordChangedEmailTemplate = () =>
  renderEmailLayout({
    title: 'Password changed',
    preview: 'Your account password was changed successfully.',
    children: `
      <h1 style="${emailTextStyles.heading}">Password changed.</h1>
      <p style="${emailTextStyles.body}">Your account password was changed successfully. If this was not you, contact support immediately.</p>
    `,
  });
