const Expense = require("../models/Expense");

exports.createExpense = async (req, res) => {
  const { amount, category, date, note, paymentMode } = req.body;

  try {
    const expense = await Expense.create({
      userId: req.user._id,
      amount,
      category,
      date,
      note,
      paymentMode,
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({
      date: -1,
    });
    res.json(expenses);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  const { amount, category, date, note, paymentMode } = req.body;

  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user._id,  // FIXED: was "user" instead of "userId"
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // FIXED: Updated field names to match the schema
    expense.amount = amount ?? expense.amount;
    expense.category = category ?? expense.category;
    expense.date = date ?? expense.date;
    expense.note = note ?? expense.note;
    expense.paymentMode = paymentMode ?? expense.paymentMode;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};