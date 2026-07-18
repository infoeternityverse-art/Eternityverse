import { notificationConfig } from '../../../config/notification.config.js';
import { renderBrandLogo } from '../components/brand-logo.js';

export const renderEmailLayout = ({ title, preview, children }) => {
  const year = new Date().getFullYear();

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;background:#000000;color:#ffffff;font-family:Inter,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preview}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:28px 14px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;border:1px solid rgba(255,255,255,0.12);border-radius:24px;background:#080808;overflow:hidden;">
            <tr>
              <td style="padding:30px 30px 18px;">
                ${renderBrandLogo({ brandName: notificationConfig.brandName })}
              </td>
            </tr>
            <tr>
              <td style="padding:6px 30px 34px;">
                ${children}
              </td>
            </tr>
            <tr>
              <td style="padding:24px 30px;background:#050505;border-top:1px solid rgba(255,255,255,0.10);">
                <p style="margin:0 0 8px;color:#a6b0cf;font-size:14px;line-height:22px;">Need help? Contact ${notificationConfig.supportEmail}.</p>
                <p style="margin:0;color:#6c7693;font-size:12px;line-height:20px;">Copyright ${year} ${notificationConfig.brandName}. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};
