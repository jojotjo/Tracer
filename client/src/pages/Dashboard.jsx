// src/pages/Dashboard.jsx
import React from "react";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-500">Total Expenses</p>
          <p className="text-2xl font-bold">₹12,500</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-500">This Month</p>
          <p className="text-2xl font-bold">₹3,200</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-500">Today</p>
          <p className="text-2xl font-bold">₹450</p>
        </div>
      </div>
    </div>
  );
}
