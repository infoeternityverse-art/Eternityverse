import { notificationConfig } from '../../config/notification.config.js';
import { renderButton } from './components/button.js';
import { renderDivider } from './components/divider.js';
import { escapeHtml } from './components/html.js';
import { renderEmailLayout } from './layout/email-layout.js';

export const adminNewEnquiryEmailTemplate = ({ enquiry, gpuPackage }) =>
  renderEmailLayout({
    title: 'New enquiry received',
    preview: 'A customer submitted a new GPU rental enquiry.',
    children: `
      <h1 style="margin:0 0 14px;font-size:30px;line-height:36px;color:#ffffff;">New enquiry received.</h1>
      <p style="margin:0;color:#a6b0cf;font-size:16px;line-height:26px;">A customer submitted a new GPU rental request for admin review.</p>
      ${renderDivider()}
      <p style="margin:0 0 10px;color:#ffffff;font-weight:700;">Customer</p>
      <p style="margin:0 0 18px;color:#a6b0cf;">${escapeHtml(enquiry.contactName)} (${escapeHtml(enquiry.contactEmail)})</p>
      <p style="margin:0 0 10px;color:#ffffff;font-weight:700;">GPU</p>
      <p style="margin:0 0 18px;color:#a6b0cf;">${escapeHtml(gpuPackage?.name || 'Selected GPU package')}</p>
      <p style="margin:0 0 10px;color:#ffffff;font-weight:700;">Budget</p>
      <p style="margin:0 0 18px;color:#a6b0cf;">${escapeHtml(enquiry.budget ?? 'Not provided')}</p>
      <p style="margin:0 0 10px;color:#ffffff;font-weight:700;">Expected Usage</p>
      <p style="margin:0;color:#a6b0cf;line-height:24px;">${escapeHtml(enquiry.expectedUsage || 'Not provided')}</p>
      ${renderDivider()}
      ${renderButton({ href: `${notificationConfig.adminDashboardUrl}/enquiries/${enquiry._id}`, label: 'Review enquiry' })}
    `,
  });
