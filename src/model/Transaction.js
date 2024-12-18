const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['debit', 'credit'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  platform: {
    type: String,
    enum: ['upi', 'cash', 'bank', 'cheque', 'card', 'other'],
    required: true
  },
  transactionDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  referenceNumber: {
    type: String,
    unique: true
  },
  category: {
    type: String,
    enum: ['food', 'transport', 'shopping', 'bills', 'entertainment', 'other'],
    required: true
  },
  paymentDetails: {
    bankName: String,
    accountNumber: String,
    upiId: String,
    chequeNumber: String
  },
  notes: {
    type: String,
    trim: true
  },
  balance: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Index for faster queries
transactionSchema.index({ userId: 1, transactionDate: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);