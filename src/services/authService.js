const User = require('../model/User');
const { hashPassword, comparePassword, generateOTP } = require('../utils/password');
const { generateToken, verifyToken } = require('../utils/tokens');
const { sendEmail } = require('../utils/email');
const { getPasswordResetTemplate, getRegistrationEmailTemplate } = require('./emailTemplates');

class AuthService {
  // User Registration and Verification
  async registerUser(userData) {
    const { email, password, name } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.accountStatus === 'pending') {
        return this._handlePendingRegistration(existingUser);
      }
      throw new Error('User already exists');
    }

    return this._createNewUser(email, password, name);
  }

  async _handlePendingRegistration(user) {
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 30 * 60 * 1000);
    await user.save();

    await sendEmail(
      user.email,
      'Complete Your Registration',
      getRegistrationEmailTemplate(user.name, otp, user.email)
    );

    return {
      success: true,
      user: this.sanitizeUser(user),
      token: generateToken(user._id),
      message: 'Please verify your account with OTP first'
    };
  }

  async _createNewUser(email, password, name) {
    const hashedPassword = await hashPassword(password);
    const otp = generateOTP();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      accountStatus: 'pending',
      otp,
      otpExpiresAt: new Date(Date.now() + 30 * 60 * 1000)
    });

    await user.save();
    await sendEmail(
      email,
      'Complete Your Registration',
      getRegistrationEmailTemplate(name, otp, email)
    );

    return {
      user: this.sanitizeUser(user),
      token: generateToken(user._id)
    };
  }

  async verifyOTP(email, otp) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    if (user.otp !== otp) {
      throw new Error('Invalid OTP');
    }

    if (new Date() > user.otpExpiresAt) {
      throw new Error('OTP has expired');
    }

    return this._activateUser(user);
  }

  async _activateUser(user) {
    user.accountStatus = 'active';
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    return this.sanitizeUser(user);
  }

  // Authentication
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (user.accountStatus === 'suspended') {
      throw new Error('Account is suspended');
    }

    if (user.accountStatus === 'pending') {
      return this._handlePendingRegistration(user);
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return {
      user: this.sanitizeUser(user),
      token: generateToken(user._id)
    };
  }

  // Token Verification
  async verifyAuthToken(token) {
    try {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.userId);
      if (!user) {
        throw new Error('User not found');
      }
      return this.sanitizeUser(user);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  // Password Reset
  async requestPasswordReset(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const resetToken = generateOTP();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    await sendEmail(
      email,
      'Password Reset Request',
      getPasswordResetTemplate(user.name, resetToken)
    );

    return true;
  }

  async resetPassword(email, token, newPassword) {
    const user = await User.findOne({
      email,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    return this._updatePassword(user, newPassword);
  }

  async _updatePassword(user, newPassword) {
    user.password = await hashPassword(newPassword);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return true;
  }

  // Utility Methods
  sanitizeUser(user) {
    return {
      id: user._id,
      email: user.email,
      name: user.name,
      accountStatus: user.accountStatus,
      role: user.role
    };
  }
}

module.exports = new AuthService();