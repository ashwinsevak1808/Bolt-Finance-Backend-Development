const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const logger = require('./logger');

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    logger.error('Password hashing error:', error);
    throw new Error('Error hashing password');
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    logger.error('Password comparison error:', error);
    throw new Error('Error comparing passwords');
  }
};

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

module.exports = {
  hashPassword,
  comparePassword,
  generateOTP
};