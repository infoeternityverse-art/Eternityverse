import nodemailer from 'nodemailer';
import { isSmtpConfigured, notificationConfig } from '../../config/notification.config.js';

let transporter;

const getTransporter = () => {
  if (!isSmtpConfigured()) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: notificationConfig.smtp.host,
      port: notificationConfig.smtp.port,
      secure: notificationConfig.smtp.secure,
      auth: {
        user: notificationConfig.smtp.user,
        pass: notificationConfig.smtp.password,
      },
    });
  }

  return transporter;
};

export const emailProvider = {
  async send({ to, subject, html, text }) {
    const mailer = getTransporter();

    if (!notificationConfig.enabled || !mailer) {
      return {
        skipped: true,
        reason: notificationConfig.enabled ? 'SMTP is not configured.' : 'Notifications disabled.',
      };
    }

    return mailer.sendMail({
      from: `"${notificationConfig.smtp.fromName}" <${notificationConfig.smtp.fromEmail}>`,
      to,
      subject,
      html,
      text,
    });
  },
};
