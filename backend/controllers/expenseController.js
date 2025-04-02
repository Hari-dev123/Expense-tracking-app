const Expense = require("../models/Expense.js");
const User = require("../models/User.js");

// Add an expense
const addExpense = async (req, res) => {
  const userId = req.user._id;
  let { category, amount, description, date } = req.body;

  if (!category || !amount || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!date || isNaN(new Date(date).getTime())) {
    date = new Date();
  }

  try {
    const expense = new Expense({
      userId: userId, // Ensure correct field name
      category,
      amount,
      description,
      date,
    });

    await expense.save();
    return res
      .status(200)
      .json({ message: "Expense added successfully", expense });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get all expenses for a user
const allExpense = async (req, res) => {
  const userId = req.user._id;
  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    if (!expenses.length) {
      return res.status(404).json({ message: "No expenses found" });
    }
    return res.status(200).json({ expenses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Delete an expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Update an expense
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, date, description } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { amount, category, date, description },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense record not found" });
    }

    return res
      .status(200)
      .json({ message: "Expense updated successfully", updatedExpense });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  addExpense,
  allExpense,
  deleteExpense,
  updateExpense,
};
