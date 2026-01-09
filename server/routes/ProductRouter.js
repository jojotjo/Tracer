const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { protect } = require('../middlewares/authMiddleware'); // Assuming you have this

router.get('/dashboard', protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id });

    // Calculate totals
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // This month
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const monthTotal = expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        const expenseMonth = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, "0")}`;
        return expenseMonth === currentMonth;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);

    // Today
    const today = new Date().toLocaleDateString();
    const todayTotal = expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date).toLocaleDateString();
        return expenseDate === today;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);

    res.status(200).json({
      totalExpenses,
      monthTotal,
      todayTotal,
      totalExpensesCount: expenses.length,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch dashboard data", error: err.message });
  }
});

module.exports = router;