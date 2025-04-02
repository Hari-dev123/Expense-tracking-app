const Income = require("../models/Income.js");
const Expense = require("../models/Expense.js");
const { isValidObjectId, Types } = require("mongoose");

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(userId);

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);



    
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Income in last 30 days
    const last30daysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast30Days = last30daysIncomeTransactions.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    // Expense in last 30 days
    const last30daysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30Days = last30daysExpenseTransactions.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    // Last 5 transactions (income + expense)
    const lastTransactions = await Promise.all([
      Income.find({ userId }).sort({ date: -1 }).limit(5),
      Expense.find({ userId }).sort({ date: -1 }).limit(5),
    ]);

    const recentTransactions = [...lastTransactions[0], ...lastTransactions[1]]
      .map((item) => ({
        ...item.toObject(),
        type: item.modelName === "Income" ? "income" : "expense",
      }))
      .sort((a, b) => b.date - a.date);

    res.status(200).json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30daysExpenseTransactions,
      },
      last30DaysIncome: {
        total: incomeLast30Days,
        transactions: last30daysIncomeTransactions,
      },
      recentTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardData };
