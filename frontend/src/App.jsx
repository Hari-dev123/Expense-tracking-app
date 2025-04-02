import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/dashboard/Home';
import Expense from './pages/dashboard/Expense'; // Fixed typo
import Income from './pages/dashboard/Income';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import { AuthProvider } from './context/authContext'; // Fixed naming
import { DashboardProvider } from './context/dashboardContext'; // Fixed naming

const App = () => {
  return (
    <AuthProvider>
      <DashboardProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/income" element={<Income />} />
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
  let isAuthenticated = !!localStorage.getItem('token'); // Converts token presence to boolean
  return isAuthenticated ? <Home /> : <Login />;
};

export default App;
