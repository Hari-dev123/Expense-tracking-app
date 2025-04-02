import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // Stores user data
    const [loading, setLoading] = useState(true); // Loading state

    // Base URL for API
    const API_URL = import.meta.env.VITE_BACKEND_URI;

    // Fetch user details when app loads
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`${API_URL}/api/auth/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user:", error.response?.data?.message || error.message);
                localStorage.removeItem("token");
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    // Login Function

    // Logout Function
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
