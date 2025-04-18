import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const FinancialOverviewChart = ({ totalIncome, totalExpense, totalBalance }) => {
    const pieChartData = [
        { name: "Income", value: totalIncome || 0, color: "#1E90FF" },
        { name: "Expense", value: totalExpense || 0, color: "#32CD32" },
        { name: "Balance", value: totalBalance || 0, color: "#FFD700" },
    ];

    return (
        <div className='bg-white  rounded-md shadow-2xl flex flex-col items-center  '>
            <h2 className="text-lg font-bold mb-5">Financial Overview</h2>
            <PieChart width={300} height={300}>
                <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                >
                    {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default FinancialOverviewChart;
