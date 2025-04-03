import React from "react";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
   <div>
    <h1 className="text-2xl px-6 py-3 font-semibold">Expense Tracker</h1>
   </div>
    <div className="flex h-screen">
      {/* Sidebar remains fixed */}
      
      <Sidebar />
      {/* Dynamic Page Content */}
      <div className="flex-1 px-2">
        <Outlet /> {/* This will render DashboardContent, Income, or Expense */}
      </div>
    </div>
    </>
  );
};

export default Home;
