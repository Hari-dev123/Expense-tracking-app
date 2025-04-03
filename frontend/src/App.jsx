import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/dashboard/Home"; // Acts as a layout
import Expense from "./pages/dashboard/Expense";
import Income from "./pages/dashboard/Income";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { AuthProvider } from "./context/authContext";
import { DashboardProvider } from "./context/dashboardContext";
import  DashboardContent  from './pages/dashboard/DashboardContent'
const App = () => {
  return (
    <AuthProvider>
      <DashboardProvider>
        <BrowserRouter>
          <Routes>
            {/* Root Redirect */}
            <Route path="/" element={<Root />} />
            
            {/* Dashboard Layout with Sidebar */}
            <Route path="/dashboard" element={<Home />}>
              <Route  index element={<DashboardContent />} />  {/* Default */}
              <Route path="income" element={<Income />} />
              <Route path="expense" element={<Expense />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </DashboardProvider>
    </AuthProvider>
  );
};

// Redirects to Dashboard if authenticated, otherwise Login
const Root = () => {
  let isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Home /> : <Login />;
};




export default App;
