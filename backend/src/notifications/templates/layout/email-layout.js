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
  <body style="margin:0;background:#f5f2fa;color:#181525;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preview}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f2fa;padding:28px 14px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;border:1px solid #ded7ea;border-radius:18px;background:#ffffff;overflow:hidden;">
            <tr>
              <td style="padding:28px 30px 16px;">
                ${renderBrandLogo({ brandName: notificationConfig.brandName })}
              </td>
            </tr>
            <tr>
              <td style="padding:8px 30px 34px;">
                ${children}
              </td>
            </tr>
            <tr>
              <td style="padding:22px 30px;background:#faf8fd;border-top:1px solid #ece6f4;">
                <p style="margin:0 0 8px;color:#5d566b;font-size:13px;line-height:21px;">Need help? Contact ${notificationConfig.supportEmail}.</p>
                <p style="margin:0;color:#81788f;font-size:12px;line-height:20px;">Copyright ${year} ${notificationConfig.brandName}. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};
