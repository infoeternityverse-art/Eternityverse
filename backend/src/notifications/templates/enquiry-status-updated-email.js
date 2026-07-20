import { notificationConfig } from '../../config/notification.config.js';
import { renderButton } from './components/button.js';
import { renderDivider } from './components/divider.js';
import { escapeHtml } from './components/html.js';
import { emailTextStyles, renderField } from './components/text.js';
import { renderEmailLayout } from './layout/email-layout.js';

const statusCopy = {
  contacted: {
    title: 'Your enquiry is in review.',
    body: 'Our team is reviewing fit, availability, and access requirements for your workload.',
  },
  approved: {
    title: 'Your enquiry was approved.',
    body: 'Your request has been approved. Credentials will be issued manually once setup is ready.',
  },
  rejected: {
    title: 'Your enquiry was not approved.',
    body: 'We could not approve this request in its current form. Please review any notes or contact support for clarification.',
  },
  fulfilled: {
    title: 'Your enquiry has been fulfilled.',
    body: 'Access has been prepared for this request. Check your dashboard for credential availability.',
  },
  pending: {
    title: 'Your enquiry status changed.',
    body: 'Your request status has been updated by our operations team.',
  },
};

export const enquiryStatusUpdatedEmailTemplate = ({ enquiry, gpuPackage }) => {
  const copy = statusCopy[enquiry.status] || statusCopy.pending;

  return renderEmailLayout({
    title: copy.title,
    preview: copy.body,
    children: `
      <h1 style="${emailTextStyles.heading}">${copy.title}</h1>
      <p style="${emailTextStyles.body}">${copy.body}</p>
      ${renderDivider()}
      ${renderField({ label: 'GPU Package', value: escapeHtml(gpuPackage?.name || 'Selected GPU package') })}
      ${renderField({ label: 'Current Status', value: escapeHtml(enquiry.status) })}
      ${
        enquiry.customerVisibleNotes
          ? `<p style="${emailTextStyles.body}">${escapeHtml(enquiry.customerVisibleNotes)}</p>`
          : ''
      }
      ${renderDivider()}
      ${renderButton({ href: notificationConfig.dashboardUrl, label: 'Review enquiry' })}
    `,
  });
};
