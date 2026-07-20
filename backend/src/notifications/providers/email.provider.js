import nodemailer from 'nodemailer';
import { isSmtpConfigured, notificationConfig } from '../../config/notification.config.js';

let transporter;
let sendQueue = Promise.resolve();

const retryDelaysMs = [1500, 4000, 8000];

const wait = (delayMs) => new Promise((resolve) => setTimeout(resolve, delayMs));

const isRetryableSmtpError = (error) => {
  const message = String(error?.message || '').toLowerCase();
  const code = String(error?.code || '').toLowerCase();

  return (
    message.includes('timeout') ||
    message.includes('temporarily') ||
    code.includes('timeout') ||
    code === 'etimedout' ||
    code === 'esocket' ||
    code === 'econnection'
  );
};

const enqueueSend = (task) => {
  const run = sendQueue.catch(() => undefined).then(task);
  sendQueue = run.catch(() => undefined);
  return run;
};

const sendWithRetry = async (task) => {
  let lastError;

  for (let attempt = 0; attempt <= retryDelaysMs.length; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      lastError = error;

      if (!isRetryableSmtpError(error) || attempt === retryDelaysMs.length) {
        throw error;
      }

      await wait(retryDelaysMs[attempt]);
    }
  }

  throw lastError;
};

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
      connectionTimeout: notificationConfig.smtp.connectionTimeoutMs,
      greetingTimeout: notificationConfig.smtp.greetingTimeoutMs,
      socketTimeout: notificationConfig.smtp.socketTimeoutMs,
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

    return enqueueSend(() =>
      sendWithRetry(() =>
        mailer.sendMail({
          from: `"${notificationConfig.smtp.fromName}" <${notificationConfig.smtp.fromEmail}>`,
          to,
          subject,
          html,
          text,
        })
      )
    );
  },
};
