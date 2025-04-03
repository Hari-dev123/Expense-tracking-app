import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineDashboard } from "react-icons/md";
import { LuWallet } from "react-icons/lu";
import { GiPayMoney } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import { DashboardContext } from '../../context/dashboardContext';

const DashboardContent = () => {
    const { dashboardData } = useContext(DashboardContext);
    const [data, setData] = useState(dashboardData);

    useEffect(() => {
        setData(dashboardData);
    }, [dashboardData]);

    console.log(data);

    return (
        <div className='bg-yellow-100 h-screen flex flex-col items-center p-5'>
            {/* Cards Container */}
            <div className='flex justify-between gap-2 w-full max-w-6xl'>

                {/* Card 1 */}
                <div className='flex justify-evenly items-center shadow-2xl w-1/3 py-10 bg-red-800 rounded-lg'>
                    <div className='p-3 rounded-full flex justify-center items-center bg-red-950 shadow-2xl w-16 h-16'>
                        <MdOutlineDashboard className='text-4xl text-white' />
                    </div>
                    <div>
                        <p className="text-white text-lg font-bold">Total Balance</p>
                        <p className="text-white text-lg font-bold"><span>&#8377;</span> {data?.totalBalance || '0'}</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className='flex justify-evenly items-center w-1/3 py-10 bg-blue-800 rounded-lg shadow-2xl'>
                    <div className='p-3 rounded-full flex justify-center items-center bg-blue-950 w-16 h-16'>
                        <LuWallet className='text-4xl text-white' />
                    </div>

                    <div>
                        <p className="text-white text-lg font-bold">Total Income</p>
                        <p className="text-white text-lg font-bold"><span>&#8377;</span> {data?.totalIncome || '0'}</p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className='flex justify-evenly items-center w-1/3 py-10 bg-green-800 rounded-lg shadow-2xl'>
                    <div className='p-3 rounded-full flex justify-center items-center bg-green-950 w-16 h-16'>
                        <GiPayMoney className='text-4xl text-white' />
                    </div>

                    <div>
                        <p className="text-white text-lg font-bold">Total Expense</p>
                        <p className="text-white text-lg font-bold"><span>&#8377;</span> {data?.totalExpense || '0'}</p>
                    </div>
                </div>
            </div>

            {/* Recent Transactions Section */}
            <div className='flex justify-between gap-2 mt-7 bg-gray-300 w-full max-w-6xl'>
                <div className='w-1/2 py-4 px-2 rounded-md bg-white shadow-2xl'>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-md font-bold'>Recent Transactions</h3>
                        <div className='flex items-center gap-1'>
                            <p className='text-sm text-black font-semibold'>See all</p>
                            <span className='inline'><FaArrowRight /></span>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 mt-4'>
                        {data?.recentTransactions?.slice(0, 5).map((transaction, index) => (
                            <div key={index} className='flex justify-between items-center bg-gray-200 p-2 rounded-md'>
                                <div>
                                    <p className='text-sm font-semibold'>
                                        {transaction.type === "expense" ? transaction.source : transaction.category}
                                    </p>
                                    <p className='text-xs text-gray-500'>{transaction.date}</p>
                                </div>
                                <p className='text-sm font-semibold'>
                                    <span>&#8377;</span> {transaction.amount}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
