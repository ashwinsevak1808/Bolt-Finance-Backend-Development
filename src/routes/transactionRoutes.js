const express = require("express");
const { body } = require("express-validator");
const transactionController = require("../controllers/transactionController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post(
  "/",
  auth,
  [
    body("amount").isNumeric(),
    body("type").isIn(["income", "expense"]),
    body("category").notEmpty(),
    body("description").trim().optional(),
    body("date").isISO8601().toDate()
  ],
  transactionController.createTransaction.bind(transactionController)
);

router.get(
  "/:id",
  auth,
  transactionController.getTransactionById.bind(transactionController)
);

router.put(
  "/:id",
  auth,
  [
    body("amount").isNumeric().optional(),
    body("type").isIn(["income", "expense"]).optional(),
    body("category").notEmpty().optional(),
    body("description").trim().optional(),
    body("date").isISO8601().toDate().optional()
  ],
  transactionController.updateTransaction.bind(transactionController)
);

router.delete(
  "/:id",
  auth,
  transactionController.deleteTransaction.bind(transactionController)
);

router.get(
  "/",
  auth,
  transactionController.getUserTransactions.bind(transactionController)
);

router.get(
  "/stats/summary",
  auth,
  transactionController.getTransactionStats.bind(transactionController)
);

router.get(
  "/stats/category",
  auth,
  transactionController.getCategoryWiseExpenses.bind(transactionController)
);

module.exports = router;
