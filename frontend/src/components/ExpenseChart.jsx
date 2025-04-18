import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ExpenseChart = ({ expenseData }) => {
    return (
        <div className=' bg-white p-2 rounded-md shadow-2xl flex flex-col items-center w-full max-w-4xl'>
            <h2 className="text-lg font-bold mb-5">Expense Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={expenseData}>
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#FF5733" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExpenseChart;
