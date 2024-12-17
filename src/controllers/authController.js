const { validationResult } = require('express-validator');
const authService = require('../services/authService');
const logger = require('../utils/logger');

class AuthController {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await authService.registerUser(req.body);
      res.status(201).json({
        message: 'User registered successfully. Please verify your account using the OTP sent to your email.',
        ...result
      });
    } catch (error) {
      logger.error('Registration error:', error);
      res.status(400).json({ message: error.message });
    }
  }

  async verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;
      const user = await authService.verifyOTP(email, otp);
      res.json({
        message: 'Account verified successfully',
        user
      });
    } catch (error) {
      logger.error('OTP verification error:', error);
      res.status(400).json({ message: error.message });
    }
  }


  async verifyToken(req, res) {
    try {
      const { token } = req.body;
      const user = await authService.verifyAuthToken(token)
      res.json({
        message: 'Token Verified',
        user
      });
    } catch (error) {
      logger.error('Token Expired:', error);
      res.status(401).json({ message: error.message });
    }
  }


  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json({
        message: 'Logged in successfully',
        ...result
      });
    } catch (error) {
      logger.error('Login error:', error);
      res.status(401).json({ message: error.message });
    }
  }

  async requestPasswordReset(req, res) {
    try {
      const { email } = req.body;
      await authService.requestPasswordReset(email);
      res.json({
        message: 'Password reset instructions sent to your email'
      });
    } catch (error) {
      logger.error('Password reset request error:', error);
      res.status(400).json({ message: error.message });
    }
  }

  async resetPassword(req, res) {
    try {
      const { email, token, newPassword } = req.body;
      await authService.resetPassword(email, token, newPassword);
      res.json({
        message: 'Password reset successful'
      });
    } catch (error) {
      logger.error('Password reset error:', error);
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();