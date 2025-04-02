const Income = require('../models/Income.js');
const Expense = require('../models/Expense.js');
const {isValidObjectId , Types} = require('mongoose');
const getDashboardData = async (req, res) => {
    try {
        const UserId = req.user.id;
        const userObjectId = new Types.ObjectId(String(UserId));


        const totalIncome = await Income.aggregate([
            {
                $match: {
                    UserId: userObjectId
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ]);
        console.log("totalincome :" , {totalIncome , UserId : isValidObjectId(UserId) });
        const totalExpense = await Expense.aggregate([
            {
                $match: {
                    UserId: userObjectId
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ]);

        //income in last 30 days
        const last30daysincomeTracsactiom = await Income.find({
            UserId,
            date : {
                $gte : new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
            }
        }).sort({date : -1});

        const incomeLast30Days = last30daysincomeTracsactiom.reduce((acc , item) => acc + item.amount , 0);

        //expense in last 30 days
        const last30daysExpenseTracsactiom = await Expense.find({
            UserId,
            date : {
                $gte : new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
            }
        }).sort({date : -1});

        const expenseLast30Days = last30daysExpenseTracsactiom.reduce((acc , item) => acc + item.amount , 0);

        //last 5 transactions (income + expense)
        const lastTransaction =[ ...(await Income.find({UserId}).sort({date : -1}).limit(5)).map(item => ({...item.toObject() , type : "income"})),
             ...(await Expense.find({UserId}).sort({date : -1}).limit(5)).map(item => ({...item.toObject() , type : "expense"}))].sort((a , b) => b.date - a.date);

        res.status(200).json({
            totalBalance : (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome : totalIncome[0]?.total || 0,
            totalExpense : totalExpense[0]?.total || 0,
            incomeLast30DaysExpenses : {
                   total : expenseLast30Days,
                   transactions : last30daysExpenseTracsactiom,
            },
            last30DaysIncome : {
                total : incomeLast30Days,
                transactions : last30daysincomeTracsactiom,
            },
            recentTransactions : lastTransaction,
        })
        




    } catch (error) {
        res.status(500).json({message : error.message});
    }
}
module.exports = {  getDashboardData };