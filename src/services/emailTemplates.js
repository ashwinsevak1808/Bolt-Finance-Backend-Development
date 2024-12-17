
const { getRegistrationEmailTemplate } = require('./templates/getRegistrationEmailTemplates');

const getPasswordResetTemplate = (name, resetToken) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Password Reset Request</h2>
      <p>Hello ${name},</p>
      <p>You requested to reset your password. Please use the following code:</p>
      <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold;">
        ${resetToken}
      </div>
      <p>This code will expire in 1 hour.</p>
      <p>If you didn't request this reset, please ignore this email.</p>
    </div>
  `;
};

module.exports = {
  getPasswordResetTemplate,
  getRegistrationEmailTemplate,
};
