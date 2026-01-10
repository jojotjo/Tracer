import { useEffect, useState } from "react";
import {
  getExpenses,
  deleteExpense,
  updateExpense
} from "../services/expenseService";
import ExpenseCard from "../components/ExpenseCard";
import { toast } from "react-toastify";
import EditExpenseModel from "../components/EditExpenseModel";
import { Filter, Trash2, Edit2, Calendar, TrendingDown, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { darkMode } = useAuth();

  // ───────────────── HELPERS ─────────────────

  const calculateTotal = (expenses) => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const filterByMonth = (expenses, month) => {
    if (!month) return expenses;
    return expenses.filter(
      (expense) => expense.createdAt.slice(0, 7) === month
    );
  };

  const filterBySearch = (expenses, term) => {
    if (!term) return expenses;
    return expenses.filter((expense) =>
      expense.category.toLowerCase().includes(term.toLowerCase()) ||
      (expense.note && expense.note.toLowerCase().includes(term.toLowerCase()))
    );
  };

  // ───────────────── DATA ─────────────────

  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setExpenses(sorted);
    } catch {
      setError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ───────────────── ACTIONS ─────────────────

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
      toast.success("Expense deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = async (data) => {
    try {
      const res = await updateExpense(editingExpense._id, data);

      setExpenses((prev) =>
        prev.map((e) => (e._id === res.data._id ? res.data : e))
      );

      toast.success("Expense updated");
      setEditingExpense(null);
    } catch {
      toast.error("Update failed");
    }
  };

  // ───────────────── DERIVED DATA ─────────────────

  let filteredExpenses = filterByMonth(expenses, selectedMonth);
  filteredExpenses = filterBySearch(filteredExpenses, searchTerm);
  const monthlyTotal = calculateTotal(filteredExpenses);

  // ───────────────── UI STATES ─────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 text-slate-900 dark:text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading expenses...</p>
        </div>
      </div>
    );
  }

  // ───────────────── UI ─────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 text-slate-900 dark:text-white pt-20 px-6 transition-colors duration-300">
      {/* Animated background elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-purple-200/50 dark:bg-purple-500/10 rounded-full blur-3xl -z-10 transition-colors duration-300"></div>
      <div className="fixed bottom-20 right-10 w-72 h-72 bg-pink-200/50 dark:bg-pink-500/10 rounded-full blur-3xl -z-10 transition-colors duration-300"></div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2">All Expenses</h1>
          <p className="text-gray-600 dark:text-gray-400">View and manage all your expenses</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-700 dark:text-red-300 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError("")}
              className="text-red-700 dark:text-red-300 hover:text-red-600 dark:hover:text-red-200"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Filters & Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by category or note..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700/50 border border-gray-300 dark:border-purple-500/30 rounded-lg text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
            />
            <TrendingDown className="absolute left-4 top-3.5 text-purple-600 dark:text-purple-400" size={20} />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-3.5 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Month Filter */}
          <div className="relative">
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700/50 border border-gray-300 dark:border-purple-500/30 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
            />
            <Calendar className="absolute left-4 top-3.5 text-purple-600 dark:text-purple-400" size={20} />
            {selectedMonth && (
              <button
                onClick={() => setSelectedMonth("")}
                className="absolute right-4 top-3.5 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Monthly Total Card */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-50 dark:from-purple-500/20 dark:to-pink-500/10 border border-purple-300 dark:border-purple-500/30 rounded-2xl p-8 mb-8 hover:border-purple-400 dark:hover:border-purple-500/60 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-700 dark:text-purple-300 text-sm font-medium mb-2">
                {selectedMonth
                  ? `Total for ${new Date(selectedMonth + "-01").toLocaleDateString("en-US", { month: "long", year: "numeric" })}`
                  : "Total for all expenses"}
                {searchTerm && ` (filtered)`}
              </p>
              <p className="text-5xl font-bold bg-gradient-to-r from-purple-600 dark:from-purple-400 to-pink-600 dark:to-pink-400 bg-clip-text text-transparent">
                ₹{monthlyTotal.toFixed(2)}
              </p>
            </div>
            <div className="text-right text-gray-600 dark:text-gray-400">
              <p className="text-sm">Total Transactions</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">
                {filteredExpenses.length}
              </p>
            </div>
          </div>
        </div>

        {/* Expense List */}
        {filteredExpenses.length === 0 ? (
          <div className="bg-gradient-to-br from-slate-100 to-gray-50 dark:from-slate-800/50 dark:to-purple-900/30 backdrop-blur-md border border-gray-300 dark:border-purple-500/20 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-purple-200 dark:bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingDown size={32} className="text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-gray-700 dark:text-gray-400 mb-2 text-lg">No expenses found</p>
            <p className="text-gray-600 dark:text-gray-500 text-sm">
              {searchTerm 
                ? "Try adjusting your search or filters"
                : "Start by adding your first expense"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredExpenses.map((expense) => (
              <div
                key={expense._id}
                className="group bg-gradient-to-br from-white to-gray-50 dark:from-slate-800/50 dark:to-purple-900/30 backdrop-blur-md border border-gray-300 dark:border-purple-500/20 rounded-xl p-5 hover:border-purple-400 dark:hover:border-purple-500/50 transition-all duration-300 transform hover:scale-102"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 bg-gradient-to-br from-purple-200 dark:from-purple-500/20 to-pink-200 dark:to-pink-500/20 rounded-lg">
                      <TrendingDown size={20} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-semibold text-lg text-slate-900 dark:text-white capitalize">
                        {expense.category}
                      </p>
                      {expense.note && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {expense.note}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {new Date(expense.createdAt).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                        ₹{expense.amount.toFixed(2)}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => setEditingExpense(expense)}
                        className="p-2 bg-blue-200 dark:bg-blue-500/20 hover:bg-blue-300 dark:hover:bg-blue-500/40 text-blue-700 dark:text-blue-400 rounded-lg transition-all"
                        title="Edit expense"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(expense._id)}
                        className="p-2 bg-red-200 dark:bg-red-500/20 hover:bg-red-300 dark:hover:bg-red-500/40 text-red-700 dark:text-red-400 rounded-lg transition-all"
                        title="Delete expense"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {editingExpense && (
          <EditExpenseModel
            expense={editingExpense}
            onClose={() => setEditingExpense(null)}
            onSave={handleUpdate}
          />
        )}
      </div>
    </div>
  );
}