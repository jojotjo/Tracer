import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, AlertCircle, CheckCircle, X } from "lucide-react";
import { toast } from "react-toastify";

const CATEGORIES = [
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Bills",
  "Health",
  "Education",
  "Other",
];

export default function BudgetManagement() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [formData, setFormData] = useState({
    category: "Food",
    amount: "",
    period: "monthly", // monthly, quarterly, yearly
  });

  // Load budgets from localStorage
  useEffect(() => {
    const savedBudgets = localStorage.getItem("budgets");
    if (savedBudgets) {
      try {
        setBudgets(JSON.parse(savedBudgets));
      } catch {
        setBudgets([]);
      }
    }
    setLoading(false);
  }, []);

  // Save budgets to localStorage
  const saveBudgets = (updatedBudgets) => {
    localStorage.setItem("budgets", JSON.stringify(updatedBudgets));
    setBudgets(updatedBudgets);
  };

  const handleAddBudget = () => {
    if (!formData.amount || formData.amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    // Check if budget already exists for this category
    if (
      !editingBudget &&
      budgets.some((b) => b.category === formData.category)
    ) {
      toast.error("Budget already exists for this category");
      return;
    }

    if (editingBudget) {
      // Update existing budget
      const updated = budgets.map((b) =>
        b.id === editingBudget.id
          ? { ...b, category: formData.category, amount: parseFloat(formData.amount), period: formData.period }
          : b
      );
      saveBudgets(updated);
      toast.success("Budget updated successfully!");
      setEditingBudget(null);
    } else {
      // Add new budget
      const newBudget = {
        id: Date.now(),
        category: formData.category,
        amount: parseFloat(formData.amount),
        period: formData.period,
        createdAt: new Date().toISOString(),
      };
      saveBudgets([...budgets, newBudget]);
      toast.success("Budget created successfully!");
    }

    setFormData({ category: "Food", amount: "", period: "monthly" });
    setShowForm(false);
  };

  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
    setFormData({
      category: budget.category,
      amount: budget.amount.toString(),
      period: budget.period,
    });
    setShowForm(true);
  };

  const handleDeleteBudget = (id) => {
    if (window.confirm("Are you sure you want to delete this budget?")) {
      const updated = budgets.filter((b) => b.id !== id);
      saveBudgets(updated);
      toast.success("Budget deleted successfully!");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBudget(null);
    setFormData({ category: "Food", amount: "", period: "monthly" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading budgets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Budget Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 transform hover:scale-105"
        >
          <Plus size={20} />
          Add Budget
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800/50 dark:to-purple-900/30 backdrop-blur-md border border-gray-300 dark:border-purple-500/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            {editingBudget ? "Edit Budget" : "Create New Budget"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Category Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-2 bg-white dark:bg-slate-700/50 border border-gray-300 dark:border-purple-500/30 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 transition-all"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-white dark:bg-slate-900">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Budget Amount (₹)
              </label>
              <input
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="w-full px-4 py-2 bg-white dark:bg-slate-700/50 border border-gray-300 dark:border-purple-500/30 rounded-lg text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>

            {/* Period Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Period
              </label>
              <select
                value={formData.period}
                onChange={(e) =>
                  setFormData({ ...formData, period: e.target.value })
                }
                className="w-full px-4 py-2 bg-white dark:bg-slate-700/50 border border-gray-300 dark:border-purple-500/30 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 transition-all"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex items-end gap-2">
              <button
                onClick={handleAddBudget}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                {editingBudget ? "Update" : "Create"}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-slate-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Budgets List */}
      {budgets.length === 0 ? (
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800/50 dark:to-purple-900/30 backdrop-blur-md border border-gray-300 dark:border-purple-500/20 rounded-2xl p-12 text-center">
          <AlertCircle className="text-gray-400 dark:text-gray-500 mx-auto mb-4" size={48} />
          <p className="text-gray-700 dark:text-gray-400 mb-2">No budgets created yet</p>
          <p className="text-gray-600 dark:text-gray-500 text-sm">
            Create your first budget to start tracking spending limits
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              onEdit={() => handleEditBudget(budget)}
              onDelete={() => handleDeleteBudget(budget.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Budget Card Component
function BudgetCard({ budget, onEdit, onDelete }) {
  const [spent, setSpent] = React.useState(0);
  const [percentage, setPercentage] = React.useState(0);
  const [status, setStatus] = React.useState("safe"); // safe, warning, exceeded

  React.useEffect(() => {
    // Get expenses from localStorage
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");

    // Filter expenses for this category
    const categoryExpenses = expenses.filter((e) => e.category === budget.category);

    // Calculate spent amount
    const totalSpent = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);
    const percentage = (totalSpent / budget.amount) * 100;

    setSpent(totalSpent);
    setPercentage(Math.min(percentage, 100));

    // Determine status
    if (percentage > 100) {
      setStatus("exceeded");
    } else if (percentage > 80) {
      setStatus("warning");
    } else {
      setStatus("safe");
    }
  }, [budget]);

  const remaining = Math.max(0, budget.amount - spent);
  const isExceeded = spent > budget.amount;

  const getStatusColor = () => {
    switch (status) {
      case "exceeded":
        return "from-red-500 to-red-600";
      case "warning":
        return "from-orange-500 to-orange-600";
      default:
        return "from-green-500 to-emerald-600";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "exceeded":
        return <AlertCircle className="text-red-500" size={20} />;
      case "warning":
        return <AlertCircle className="text-orange-500" size={20} />;
      default:
        return <CheckCircle className="text-green-500" size={20} />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800/50 dark:to-purple-900/30 backdrop-blur-md border border-gray-300 dark:border-purple-500/20 rounded-2xl p-6 hover:border-purple-400 dark:hover:border-purple-500/50 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getStatusColor()} flex items-center justify-center`}>
            {getStatusIcon()}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {budget.category}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
              {budget.period}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-600 dark:text-blue-400 rounded-lg transition-all"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-600 dark:text-red-400 rounded-lg transition-all"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Budget Info */}
      <div className="space-y-4">
        {/* Budget Amount */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">Budget</span>
          <span className="font-bold text-slate-900 dark:text-white">
            ₹{budget.amount.toFixed(2)}
          </span>
        </div>

        {/* Spent Amount */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">Spent</span>
          <span className={`font-bold ${isExceeded ? "text-red-600 dark:text-red-400" : "text-slate-900 dark:text-white"}`}>
            ₹{spent.toFixed(2)}
          </span>
        </div>

        {/* Remaining Amount */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">Remaining</span>
          <span className={`font-bold ${remaining <= 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
            ₹{remaining.toFixed(2)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 dark:text-gray-400">Progress</span>
            <span className={`text-xs font-bold ${percentage > 100 ? "text-red-600 dark:text-red-400" : "text-slate-900 dark:text-white"}`}>
              {percentage.toFixed(0)}%
            </span>
          </div>

          <div className="w-full h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${getStatusColor()} transition-all duration-300`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Status Message */}
        {isExceeded && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-center">
            <p className="text-sm font-semibold text-red-600 dark:text-red-400">
              ⚠️ Budget Exceeded by ₹{(spent - budget.amount).toFixed(2)}
            </p>
          </div>
        )}

        {status === "warning" && !isExceeded && (
          <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-3 text-center">
            <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
              ⚠️ {((100 - percentage).toFixed(0))}% budget remaining
            </p>
          </div>
        )}

        {status === "safe" && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-center">
            <p className="text-sm font-semibold text-green-600 dark:text-green-400">
              ✓ On Track - {remaining.toFixed(2)} left
            </p>
          </div>
        )}
      </div>
    </div>
  );
}