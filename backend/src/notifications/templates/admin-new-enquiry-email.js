import { notificationConfig } from '../../config/notification.config.js';
import { renderButton } from './components/button.js';
import { renderDivider } from './components/divider.js';
import { escapeHtml } from './components/html.js';
import { emailTextStyles, renderField } from './components/text.js';
import { renderEmailLayout } from './layout/email-layout.js';

export const adminNewEnquiryEmailTemplate = ({ enquiry, gpuPackage }) =>
  renderEmailLayout({
    title: 'New enquiry received',
    preview: 'A customer submitted a new GPU rental enquiry.',
    children: `
      <h1 style="${emailTextStyles.heading}">New enquiry received.</h1>
      <p style="${emailTextStyles.body}">A customer submitted a new GPU rental request for admin review.</p>
      ${renderDivider()}
      ${renderField({ label: 'Customer', value: `${escapeHtml(enquiry.contactName)} (${escapeHtml(enquiry.contactEmail)})` })}
      ${renderField({ label: 'GPU', value: escapeHtml(gpuPackage?.name || 'Selected GPU package') })}
      ${renderField({ label: 'Budget', value: escapeHtml(enquiry.budget ?? 'Not provided') })}
      <p style="${emailTextStyles.label}">Expected Usage</p>
      <p style="${emailTextStyles.body}">${escapeHtml(enquiry.expectedUsage || 'Not provided')}</p>
      ${renderDivider()}
      ${renderButton({ href: `${notificationConfig.adminDashboardUrl}/enquiries/${enquiry._id}`, label: 'Review enquiry' })}
    `,
  });
