export const emailTextStyles = {
  heading:
    'margin:0 0 12px;font-size:26px;line-height:34px;color:#181525;font-weight:700;letter-spacing:0;',
  body: 'margin:0;color:#4f4a60;font-size:15px;line-height:24px;',
  muted: 'margin:20px 0 0;color:#706a7d;font-size:13px;line-height:21px;',
  label:
    'margin:0 0 6px;color:#706a7d;font-size:12px;line-height:18px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;',
  value: 'margin:0 0 16px;color:#181525;font-size:15px;line-height:23px;',
};

export const renderField = ({ label, value }) => `
  <p style="${emailTextStyles.label}">${label}</p>
  <p style="${emailTextStyles.value}">${value}</p>
`;
