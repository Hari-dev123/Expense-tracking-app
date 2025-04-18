import React from "react";
import { FaArrowRight } from "react-icons/fa";
import PriceTag from "./PriceTag"; // Ensure PriceTag is available in your project

const RecentTransactions = ({ transactions }) => {
    return (
        <div className="w-1/2 py-4 px-2 rounded-md bg-white shadow-2xl">
            <div className="flex justify-between items-center">
                <h3 className="text-md font-bold">Recent Transactions</h3>
                <div className="flex items-center gap-1 cursor-pointer">
                    <p className="text-sm text-black font-semibold">See all</p>
                    <span className="inline"><FaArrowRight /></span>
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-4 h-32 overflow-y-auto">
                {transactions?.slice(0, 5).map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-200 p-2 rounded-md">
                        <div>
                            <p className="text-sm font-semibold">
                                {transaction.type === "income" ? transaction.source : transaction.category}
                            </p>
                            <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                        </div>

                        <PriceTag type={transaction.type} amount={transaction.amount} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
