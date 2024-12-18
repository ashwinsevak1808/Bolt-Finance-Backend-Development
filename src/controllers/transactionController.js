
const { validationResult } = require('express-validator');
const transactionService = require('../services/transactionService');
const logger = require('../utils/logger');

class TransactionController {
  async createTransaction(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const transactionData = { ...req.body, userId: req.user.id };
      const transaction = await transactionService.createTransaction(transactionData);
      res.status(201).json({
        message: 'Transaction created successfully',
        transaction
      });
    } catch (error) {
      logger.error('Transaction creation error:', error);
      res.status(400).json({ message: error.message });
    }
  }

  async getTransactionById(req, res) {
    try {
      const transaction = await transactionService.getTransactionById(req.params.id, req.user.id);
      res.json({ transaction });
    } catch (error) {
      logger.error('Get transaction error:', error);
      res.status(404).json({ message: error.message });
    }
  }

  async updateTransaction(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const transaction = await transactionService.updateTransaction(
        req.params.id,
        req.user.id,
        req.body
      );
      res.json({
        message: 'Transaction updated successfully',
        transaction
      });
    } catch (error) {
      logger.error('Transaction update error:', error);
      res.status(400).json({ message: error.message });
    }
  }

  async deleteTransaction(req, res) {
    try {
      await transactionService.deleteTransaction(req.params.id, req.user.id);
      res.json({
        message: 'Transaction deleted successfully'
      });
    } catch (error) {
      logger.error('Transaction deletion error:', error);
      res.status(404).json({ message: error.message });
    }
  }

  async getUserTransactions(req, res) {
    try {
      const transactions = await transactionService.getUserTransactions(req.user.id, req.query);
      res.json({ transactions });
    } catch (error) {
      logger.error('Get user transactions error:', error);
      res.status(400).json({ message: error.message });
    }
  }

  async getTransactionStats(req, res) {
    try {
      const period = parseInt(req.query.period) || 30;
      const stats = await transactionService.getTransactionStats(req.user.id, period);
      res.json({ stats });
    } catch (error) {
      logger.error('Get transaction stats error:', error);
      res.status(400).json({ message: error.message });
    }
  }

  async getCategoryWiseExpenses(req, res) {
    try {
      const period = parseInt(req.query.period) || 30;
      const categoryStats = await transactionService.getCategoryWiseExpenses(req.user.id, period);
      res.json({ categoryStats });
    } catch (error) {
      logger.error('Get category expenses error:', error);
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new TransactionController();
