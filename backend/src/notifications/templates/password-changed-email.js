import { renderEmailLayout } from './layout/email-layout.js';

export const passwordChangedEmailTemplate = () =>
  renderEmailLayout({
    title: 'Password changed',
    preview: 'Your account password was changed successfully.',
    children: `
      <h1 style="margin:0 0 14px;font-size:30px;line-height:36px;color:#ffffff;">Password changed.</h1>
      <p style="margin:0;color:#a6b0cf;font-size:16px;line-height:26px;">Your account password was changed successfully. If this was not you, contact support immediately.</p>
    `,
  });
