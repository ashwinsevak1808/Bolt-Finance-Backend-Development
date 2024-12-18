
const Transaction = require('../model/Transaction');

class TransactionService {
  async createTransaction(transactionData) {
    const transaction = new Transaction(transactionData);
    await transaction.save();
    return transaction;
  }

  async getTransactionById(transactionId, userId) {
    const transaction = await Transaction.findOne({
      _id: transactionId,
      userId
    });
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    return transaction;
  }

  async updateTransaction(transactionId, userId, updateData) {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: transactionId, userId },
      updateData,
      { new: true }
    );
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    return transaction;
  }

  async deleteTransaction(transactionId, userId) {
    const transaction = await Transaction.findOneAndDelete({
      _id: transactionId,
      userId
    });
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    return transaction;
  }

  async getUserTransactions(userId, filters = {}) {
    const query = { userId };

    if (filters.type) query.type = filters.type;
    if (filters.platform) query.platform = filters.platform;
    if (filters.category) query.category = filters.category;
    if (filters.status) query.status = filters.status;
    
    if (filters.startDate && filters.endDate) {
      query.transactionDate = {
        $gte: new Date(filters.startDate),
        $lte: new Date(filters.endDate)
      };
    }

    const transactions = await Transaction.find(query)
      .sort({ transactionDate: -1 });
    
    return transactions;
  }

  async getTransactionStats(userId, period) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - period);

    const stats = await Transaction.aggregate([
      {
        $match: {
          userId: userId,
          transactionDate: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    return stats;
  }

  async getCategoryWiseExpenses(userId, period) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - period);

    const categoryStats = await Transaction.aggregate([
      {
        $match: {
          userId: userId,
          type: 'debit',
          transactionDate: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    return categoryStats;
  }
}

module.exports = new TransactionService();
