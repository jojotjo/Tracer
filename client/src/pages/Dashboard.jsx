import React, { useEffect, useState } from "react";
import { getExpenses } from "../services/expenseService";
import { Wallet, TrendingDown, Calendar, Clock, Plus, ArrowUpRight, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await getExpenses();
        setExpenses(res.data);
      } catch (err) {
        setError("Failed to load expenses");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Calculate totals
  const calculateTotal = (expensesList) => {
    return expensesList.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const calculateMonthTotal = (expensesList) => {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    
    return expensesList
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        const expenseMonth = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, "0")}`;
        return expenseMonth === currentMonth;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const calculateTodayTotal = (expensesList) => {
    const today = new Date().toLocaleDateString();
    
    return expensesList
      .filter((expense) => {
        const expenseDate = new Date(expense.date).toLocaleDateString();
        return expenseDate === today;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const totalExpenses = calculateTotal(expenses);
  const monthTotal = calculateMonthTotal(expenses);
  const todayTotal = calculateTodayTotal(expenses);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-20 px-6">
      {/* Animated background elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-20 right-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2">
            Dashboard
            <span className="block text-2xl font-medium text-gray-400 mt-2">
              Track your spending
            </span>
          </h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Expenses Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 p-8 hover:border-blue-500/60 transition-all duration-300 transform hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-blue-300 text-sm font-medium">Total Expenses</p>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Wallet size={24} className="text-blue-400" />
                </div>
              </div>
              
              <p className="text-4xl font-bold mb-2">
                ₹{totalExpenses.toFixed(2)}
              </p>
              <p className="text-blue-300/70 text-sm">All time</p>
            </div>
          </div>

          {/* This Month Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 p-8 hover:border-green-500/60 transition-all duration-300 transform hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-green-300 text-sm font-medium">This Month</p>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Calendar size={24} className="text-green-400" />
                </div>
              </div>
              
              <p className="text-4xl font-bold mb-2">
                ₹{monthTotal.toFixed(2)}
              </p>
              <p className="text-green-300/70 text-sm">
                {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </div>
          </div>

          {/* Today Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 p-8 hover:border-orange-500/60 transition-all duration-300 transform hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-orange-300 text-sm font-medium">Today</p>
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <Clock size={24} className="text-orange-400" />
                </div>
              </div>
              
              <p className="text-4xl font-bold mb-2">
                ₹{todayTotal.toFixed(2)}
              </p>
              <p className="text-orange-300/70 text-sm">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Expenses Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Recent Expenses</h2>
            <button
              onClick={() => navigate("/add-expense")}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 transform hover:scale-105"
            >
              <Plus size={20} />
              Add Expense
            </button>
          </div>

          {expenses.length === 0 ? (
            <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-md border border-purple-500/20 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown size={32} className="text-purple-400" />
              </div>
              <p className="text-gray-400 mb-2">No expenses yet</p>
              <p className="text-gray-500 text-sm">Start tracking your expenses by adding your first one</p>
              <button
                onClick={() => navigate("/add-expense")}
                className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Add First Expense
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {expenses.slice(0, 10).map((expense) => (
                <div
                  key={expense._id}
                  className="group bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-md border border-purple-500/20 rounded-xl p-5 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-102"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
                        <TrendingDown size={20} className="text-purple-400" />
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-semibold text-lg text-white capitalize">
                          {expense.category}
                        </p>
                        {expense.note && (
                          <p className="text-sm text-gray-400 mt-1">
                            {expense.note}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(expense.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                        ₹{expense.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        <ArrowUpRight size={14} className="inline text-red-400" /> Expense
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {expenses.length > 10 && (
                <div className="text-center pt-6">
                  <button
                    onClick={() => navigate("/expenses")}
                    className="px-6 py-2 text-purple-400 hover:text-purple-300 font-medium transition"
                  >
                    View All Expenses →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {expenses.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Quick Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Average Expense */}
              <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-md border border-purple-500/20 rounded-2xl p-8">
                <p className="text-gray-400 text-sm font-medium mb-2">Average Expense</p>
                <p className="text-3xl font-bold mb-2">
                  ₹{(totalExpenses / expenses.length).toFixed(2)}
                </p>
                <p className="text-gray-500 text-sm">Per transaction</p>
              </div>

              {/* Category Count */}
              <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-md border border-purple-500/20 rounded-2xl p-8">
                <p className="text-gray-400 text-sm font-medium mb-2">Total Transactions</p>
                <p className="text-3xl font-bold mb-2">
                  {expenses.length}
                </p>
                <p className="text-gray-500 text-sm">expenses tracked</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}