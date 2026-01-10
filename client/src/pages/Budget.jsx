import React, { useEffect, useState } from "react";
import BudgetManagement from "../components/BudgetManagement";
import { AlertCircle, TrendingDown, Target, Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const { darkMode } = useAuth();

  useEffect(() => {
    // Load budgets
    const savedBudgets = localStorage.getItem("budgets");
    if (savedBudgets) {
      try {
        setBudgets(JSON.parse(savedBudgets));
      } catch {
        setBudgets([]);
      }
    }

    // Load expenses
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      try {
        setExpenses(JSON.parse(savedExpenses));
      } catch {
        setExpenses([]);
      }
    }
  }, []);

  // Calculate statistics
  const stats = React.useMemo(() => {
    const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
    
    const totalSpent = budgets.reduce((sum, budget) => {
      const categoryExpenses = expenses.filter(e => e.category === budget.category);
      const spent = categoryExpenses.reduce((s, e) => s + e.amount, 0);
      return sum + spent;
    }, 0);

    const exceededCount = budgets.filter(budget => {
      const categoryExpenses = expenses.filter(e => e.category === budget.category);
      const spent = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);
      return spent > budget.amount;
    }).length;

    const onTrackCount = budgets.filter(budget => {
      const categoryExpenses = expenses.filter(e => e.category === budget.category);
      const spent = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);
      return spent <= budget.amount;
    }).length;

    return {
      totalBudget,
      totalSpent,
      remaining: Math.max(0, totalBudget - totalSpent),
      exceededCount,
      onTrackCount,
      utilizationRate: budgets.length > 0 ? ((totalSpent / totalBudget) * 100).toFixed(1) : 0,
    };
  }, [budgets, expenses]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 text-slate-900 dark:text-white pt-20 px-6 transition-colors duration-300">
      {/* Animated background elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-purple-200/50 dark:bg-purple-500/10 rounded-full blur-3xl -z-10 transition-colors duration-300"></div>
      <div className="fixed bottom-20 right-10 w-72 h-72 bg-pink-200/50 dark:bg-pink-500/10 rounded-full blur-3xl -z-10 transition-colors duration-300"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2">Budget Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Set and track spending limits for each category</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <StatCard
            title="Total Budget"
            value={`₹${stats.totalBudget.toFixed(2)}`}
            icon={Target}
            color="from-purple-500 to-pink-500"
          />
          <StatCard
            title="Total Spent"
            value={`₹${stats.totalSpent.toFixed(2)}`}
            icon={TrendingDown}
            color="from-blue-500 to-cyan-500"
          />
          <StatCard
            title="Remaining"
            value={`₹${stats.remaining.toFixed(2)}`}
            icon={Zap}
            color="from-green-500 to-emerald-500"
          />
          <StatCard
            title="Utilization"
            value={`${stats.utilizationRate}%`}
            icon={AlertCircle}
            color="from-orange-500 to-red-500"
          />
        </div>

        {/* Budget Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* On Track */}
          <div className="bg-gradient-to-br from-green-100 to-emerald-50 dark:from-green-500/20 dark:to-emerald-500/10 border border-green-300 dark:border-green-500/30 rounded-2xl p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{stats.onTrackCount}</span>
              </div>
              <div>
                <p className="text-green-700 dark:text-green-300 font-medium text-sm">Budgets On Track</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {stats.onTrackCount} out of {budgets.length}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">Categories within budget</p>
              </div>
            </div>
          </div>

          {/* Exceeded */}
          <div className="bg-gradient-to-br from-red-100 to-red-50 dark:from-red-500/20 dark:to-red-500/10 border border-red-300 dark:border-red-500/30 rounded-2xl p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{stats.exceededCount}</span>
              </div>
              <div>
                <p className="text-red-700 dark:text-red-300 font-medium text-sm">Budgets Exceeded</p>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                  {stats.exceededCount} out of {budgets.length}
                </p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">Categories over budget</p>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Management Component */}
        <BudgetManagement />

        {/* Tips Section */}
        {budgets.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 border border-purple-300 dark:border-purple-500/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              💡 Budget Tips
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                • <strong>Review regularly:</strong> Check your budgets weekly to stay aware of spending
              </li>
              <li>
                • <strong>Adjust as needed:</strong> Update budget limits based on actual spending patterns
              </li>
              <li>
                • <strong>Set realistic limits:</strong> Based on your historical spending data
              </li>
              <li>
                • <strong>Track categories:</strong> Create budgets for your top spending categories
              </li>
              <li>
                • <strong>Use warnings:</strong> Pay attention to the warning zone (80%+) alerts
              </li>
            </ul>
          </div>
        )}

        {/* Empty State Tips */}
        {budgets.length === 0 && (
          <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 border border-blue-300 dark:border-blue-500/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              🎯 Getting Started with Budgets
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                1. Click "Add Budget" button to create your first budget
              </li>
              <li>
                2. Select a spending category (Food, Transport, etc.)
              </li>
              <li>
                3. Enter your budget amount for the period
              </li>
              <li>
                4. Choose the period (Monthly, Quarterly, or Yearly)
              </li>
              <li>
                5. Monitor your spending against these budgets
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className={`bg-gradient-to-br from-${color.split(" ")[1].replace("to-", "")} to-${color.split(" ")[2]} opacity-10 dark:opacity-20 border border-gray-300 dark:border-purple-500/20 rounded-2xl p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
}