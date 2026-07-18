import { renderButton } from './components/button.js';
import { renderDivider } from './components/divider.js';
import { escapeHtml } from './components/html.js';
import { renderEmailLayout } from './layout/email-layout.js';
import { notificationConfig } from '../../config/notification.config.js';

export const enquiryReceivedEmailTemplate = ({ enquiry, gpuPackage }) =>
  renderEmailLayout({
    title: 'Enquiry received',
    preview: 'Your GPU rental enquiry has been received.',
    children: `
      <h1 style="margin:0 0 14px;font-size:30px;line-height:36px;color:#ffffff;">We received your enquiry.</h1>
      <p style="margin:0;color:#a6b0cf;font-size:16px;line-height:26px;">Our operations team will review your request and follow up with next steps. Typical response time is within 1 business day.</p>
      ${renderDivider()}
      <p style="margin:0 0 10px;color:#ffffff;font-weight:700;">Enquiry ID</p>
      <p style="margin:0 0 18px;color:#a6b0cf;">${escapeHtml(enquiry._id)}</p>
      <p style="margin:0 0 10px;color:#ffffff;font-weight:700;">GPU Package</p>
      <p style="margin:0 0 18px;color:#a6b0cf;">${escapeHtml(gpuPackage?.name || 'Selected GPU package')}</p>
      <p style="margin:0 0 10px;color:#ffffff;font-weight:700;">Project Summary</p>
      <p style="margin:0;color:#a6b0cf;line-height:24px;">${escapeHtml(enquiry.projectDescription)}</p>
      ${renderDivider()}
      ${renderButton({ href: notificationConfig.dashboardUrl, label: 'View dashboard' })}
    `,
  });
