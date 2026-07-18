import { escapeHtml } from './components/html.js';
import { renderEmailLayout } from './layout/email-layout.js';

export const criticalSystemErrorEmailTemplate = ({ summary = 'Critical system error' }) =>
  renderEmailLayout({
    title: 'Critical system error',
    preview: summary,
    children: `
      <h1 style="margin:0 0 14px;font-size:30px;line-height:36px;color:#ffffff;">Critical system error.</h1>
      <p style="margin:0;color:#a6b0cf;font-size:16px;line-height:26px;">${escapeHtml(summary)}</p>
      <p style="margin:22px 0 0;color:#6c7693;font-size:14px;line-height:22px;">Monitoring integration is architecture-ready and can be connected in a future milestone.</p>
    `,
  });
