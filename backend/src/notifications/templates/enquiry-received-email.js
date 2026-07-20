import { renderButton } from './components/button.js';
import { renderDivider } from './components/divider.js';
import { escapeHtml } from './components/html.js';
import { emailTextStyles, renderField } from './components/text.js';
import { renderEmailLayout } from './layout/email-layout.js';
import { notificationConfig } from '../../config/notification.config.js';

export const enquiryReceivedEmailTemplate = ({ enquiry, gpuPackage }) =>
  renderEmailLayout({
    title: 'Enquiry received',
    preview: 'Your GPU rental enquiry has been received.',
    children: `
      <h1 style="${emailTextStyles.heading}">We received your enquiry.</h1>
      <p style="${emailTextStyles.body}">Our operations team will review your request and follow up with next steps. Typical response time is within 1 business day.</p>
      ${renderDivider()}
      ${renderField({ label: 'Enquiry ID', value: escapeHtml(enquiry._id) })}
      ${renderField({ label: 'GPU Package', value: escapeHtml(gpuPackage?.name || 'Selected GPU package') })}
      <p style="${emailTextStyles.label}">Project Summary</p>
      <p style="${emailTextStyles.body}">${escapeHtml(enquiry.projectDescription)}</p>
      ${renderDivider()}
      ${renderButton({ href: notificationConfig.dashboardUrl, label: 'View dashboard' })}
    `,
  });
