import React from "react";
import { FaArrowRight } from "react-icons/fa";
import ExpenseChart from "./ExpenseChart";
import PriceTag from "./PriceTag";

const RecentExpenses = ({ data }) => {
    return (
        <div className='flex justify-between gap-2 mt-2 p-4 bg-gray-100 w-full max-w-6xl'>
            {/* Recent Expenses */}
            <div className='w-1/2 py-4 px-2 rounded-md bg-white shadow-2xl'>
                <div className='flex justify-between items-center'>
                    <h3 className='text-md font-bold'>Recent Expenses</h3>
                    <div className='flex items-center gap-1'>
                        <p className='text-sm text-black font-semibold'>See all</p>
                        <span className='inline'><FaArrowRight /></span>
                    </div>
                </div>

                <div className='flex flex-col gap-2 mt-4 h-20'>
                    {data?.last30DaysExpenses?.transactions?.slice(0, 5).map((expense, index) => (
                        <div key={index} className='flex justify-between items-center bg-gray-200 p-2 rounded-md'>
                            <div>
                                <p className='text-sm font-semibold'>{expense.category}</p>
                                <p className='text-xs text-gray-500'>{new Date(expense.date).toLocaleDateString()}</p>
                            </div>
                            <PriceTag type="expense" amount={expense.amount} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Expense Chart */}
            <div className='w-1/2 py-2 px-2 h-full rounded-md bg-white shadow-2xl'>
                <ExpenseChart expenseData={data?.last30DaysExpenses?.transactions || []} />
            </div>
        </div>
    );
};

export default RecentExpenses;
