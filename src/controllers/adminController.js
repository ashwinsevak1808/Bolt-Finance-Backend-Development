const User = require('../model/User');
const logger = require('../utils/logger');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    logger.error('Admin getAllUsers error:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    logger.error('Admin getUser error:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { accountStatus: status },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    logger.error('Admin updateUserStatus error:', error);
    res.status(500).json({ message: 'Error updating user status' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    logger.error('Admin deleteUser error:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ accountStatus: 'active' });
    const pendingUsers = await User.countDocuments({ accountStatus: 'pending' });
    const suspendedUsers = await User.countDocuments({ accountStatus: 'suspended' });

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        pendingUsers,
        suspendedUsers
      }
    });
  } catch (error) {
    logger.error('Admin getStats error:', error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
};