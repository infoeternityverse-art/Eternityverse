export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  appName: import.meta.env.VITE_APP_NAME || 'GPU Cloud Marketplace',
  appEnv: import.meta.env.VITE_APP_ENV || 'development',
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'support@example.com',
};
