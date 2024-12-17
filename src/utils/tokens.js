const jwt = require('jsonwebtoken');
const logger = require('./logger');

const generateToken = (userId) => {
  try {
    return jwt.sign(
      { userId }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  } catch (error) {
    logger.error('Token generation error:', error);
    throw new Error('Error generating access token');
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    logger.error('Token verification error:', error);
    throw new Error('Invalid token');
  }
};

module.exports = {
  generateToken,
  verifyToken
};