import { config } from './index.js';
import { loadEnv } from './env.js';

const parseEmailList = (value) =>
  String(value || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

const adminNotificationEmails = [
  ...parseEmailList(loadEnv('ADMIN_NOTIFICATION_EMAILS')),
  ...parseEmailList(loadEnv('ADMIN_EMAIL')),
];

export const notificationConfig = {
  enabled: loadEnv('NOTIFICATIONS_ENABLED', 'true') === 'true',
  brandName: loadEnv('NOTIFICATION_BRAND_NAME', 'EternityVerse'),
  supportEmail: loadEnv('SUPPORT_EMAIL', loadEnv('SMTP_FROM_EMAIL', 'support@example.com')),
  dashboardUrl: loadEnv('APP_DASHBOARD_URL', `${config.corsOrigin}/dashboard`),
  adminDashboardUrl: loadEnv('APP_ADMIN_URL', `${config.corsOrigin}/admin`),
  frontendUrl: loadEnv('APP_FRONTEND_URL', config.corsOrigin),
  adminNotificationEmails: [...new Set(adminNotificationEmails)],
  smtp: {
    host: loadEnv('SMTP_HOST'),
    port: Number(loadEnv('SMTP_PORT', 587)),
    user: loadEnv('SMTP_USER'),
    password: loadEnv('SMTP_PASSWORD'),
    fromName: loadEnv('SMTP_FROM_NAME', loadEnv('NOTIFICATION_BRAND_NAME', 'EternityVerse')),
    fromEmail: loadEnv('SMTP_FROM_EMAIL'),
    secure: loadEnv('SMTP_SECURE', 'false') === 'true',
    connectionTimeoutMs: Number(loadEnv('SMTP_CONNECTION_TIMEOUT_MS', 10000)),
    greetingTimeoutMs: Number(loadEnv('SMTP_GREETING_TIMEOUT_MS', 10000)),
    socketTimeoutMs: Number(loadEnv('SMTP_SOCKET_TIMEOUT_MS', 15000)),
  },
};

export const isSmtpConfigured = () =>
  Boolean(
    notificationConfig.smtp.host &&
    notificationConfig.smtp.port &&
    notificationConfig.smtp.user &&
    notificationConfig.smtp.password &&
    notificationConfig.smtp.fromEmail
  );
