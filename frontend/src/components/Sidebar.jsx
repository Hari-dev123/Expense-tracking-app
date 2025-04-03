import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { LuWallet } from "react-icons/lu";
import { GiPayMoney } from "react-icons/gi";
import { GrLogout } from "react-icons/gr";
import { AuthContext } from "../context/authContext";
import { DashboardContext } from "../context/dashboardContext";

const Sidebar = () => {
    const { user } = useContext(AuthContext);
    

    // State for storing dashboard data
    const [User, setUser] = useState(user);
    

    // Sync state when dashboardData changes
    

    useEffect(() => {
        setUser(user);
    }, [User]);

    console.log(User)



    return (
        <div className="h-full w-64 bg-black text-white p-4">

            <h1 className="text-xl mx-2 my-4">{User ? User.fullName : 'Guest'}</h1>
            <ul className="space-y-4">
                <li>
                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded ${isActive ? "bg-gray-700" : "hover:text-gray-400"}`
                        }
                    >
                        <MdOutlineDashboard /> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/income"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded ${isActive ? "bg-gray-700" : "hover:text-gray-400"}`
                        }
                    >
                        <LuWallet /> Income
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/expense"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded ${isActive ? "bg-gray-700" : "hover:text-gray-400"}`
                        }
                    >
                        <GiPayMoney /> Expense
                    </NavLink>
                </li>
                <li>
                    <button className="flex items-center gap-2 text-red-400 hover:text-red-600">
                        <GrLogout /> Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
