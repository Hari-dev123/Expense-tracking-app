import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/dashboard/Home';
import Expence from './pages/dashboard/Expence';
import Income from './pages/dashboard/Income';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/expense" element={<Expence />} />
        <Route path="/income" element={<Income />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

const Root = () => {
  let isTrue = !!localStorage.getItem('token'); // Convert to boolean
  return isTrue ? <Home /> : <Login />;
};



export default App;
