import { escapeHtml } from './components/html.js';
import { emailTextStyles } from './components/text.js';
import { renderEmailLayout } from './layout/email-layout.js';

export const criticalSystemErrorEmailTemplate = ({ summary = 'Critical system error' }) =>
  renderEmailLayout({
    title: 'Critical system error',
    preview: summary,
    children: `
      <h1 style="${emailTextStyles.heading}">Critical system error.</h1>
      <p style="${emailTextStyles.body}">${escapeHtml(summary)}</p>
      <p style="${emailTextStyles.muted}">Monitoring integration is architecture-ready and can be connected in a future milestone.</p>
    `,
  });
