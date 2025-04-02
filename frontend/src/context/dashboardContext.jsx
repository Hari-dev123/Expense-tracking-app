import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";

// Create Dashboard Context
export const DashboardContext = createContext();

// Dashboard Provider Component
export const DashboardProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [dashboardData, setDashboardData] = useState({
        totalBalance: 0,
        totalIncome: 0,
        totalExpense: 0,
        recentTransactions: [],
        last30DaysIncome: { total: 0, transactions: [] },
        last30DaysExpenses: { total: 0, transactions: [] }
    });
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_BACKEND_URI;

    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user) return;
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_URL}/api/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDashboardData(response.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error.response?.data?.message || error.message);
            }
            setLoading(false);
        };

        fetchDashboardData();
    }, [user]);

    return (
        <DashboardContext.Provider value={{ dashboardData, loading }}>
            {children}
        </DashboardContext.Provider>
    );
};
