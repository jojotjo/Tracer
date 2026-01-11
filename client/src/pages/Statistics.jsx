import React, { useEffect, useState } from "react";
import { getExpenses } from "../services/expenseService";
import StatisticsCharts from "../components/StatisticsCharts";
import { TrendingUp, Calendar, Download, Filter } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Statistics() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const { darkMode } = useAuth();

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

  const filteredExpenses = selectedMonth
    ? expenses.filter(
        (expense) =>
          new Date(expense.date || expense.createdAt)
            .toISOString()
            .slice(0, 7) === selectedMonth
      )
    : expenses;

  const downloadReport = () => {
    const csvContent = [
      ["Date", "Category", "Amount", "Payment Mode", "Note"],
      ...filteredExpenses.map((e) => [
        new Date(e.date || e.createdAt).toLocaleDateString(),
        e.category,
        e.amount,
        e.paymentMode || "N/A",
        e.note || "",
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent)
    );
    element.setAttribute(
      "download",
      `expense-report-${new Date().toISOString().split("T")[0]}.csv`
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 text-slate-900 dark:text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 text-slate-900 dark:text-white pt-20 px-6 transition-colors duration-300">
      {/* Animated background elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-purple-200/50 dark:bg-purple-500/10 rounded-full blur-3xl -z-10 transition-colors duration-300"></div>
      <div className="fixed bottom-20 right-10 w-72 h-72 bg-pink-200/50 dark:bg-pink-500/10 rounded-full blur-3xl -z-10 transition-colors duration-300"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold mb-2">Statistics & Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">Visualize your spending patterns and insights</p>
          </div>
          <button
            onClick={downloadReport}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 transform hover:scale-105"
          >
            <Download size={20} />
            Download Report
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by Month
            </label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-slate-700/50 border border-gray-300 dark:border-purple-500/30 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>
          {selectedMonth && (
            <div className="py-4">
              <button
                onClick={() => setSelectedMonth("")}
                className="flex items-end px-5 py-4 gap-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 transform hover:scale-105"
              >
                <Filter size={20}/>
                Clear Filter
              </button>
            </div>
          )}
        </div>

        {/* Statistics Component */}
        <StatisticsCharts expenses={filteredExpenses} />

        {/* Summary */}
        <div className="mt-12 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800/50 dark:to-purple-900/30 backdrop-blur-md border border-gray-300 dark:border-purple-500/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">Report Period</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {selectedMonth
                  ? new Date(selectedMonth + "-01").toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "All Time"}
              </p>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">Total Transactions</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {filteredExpenses.length}
              </p>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">Total Spent</p>
              <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                ₹{filteredExpenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">Average per Transaction</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {filteredExpenses.length > 0
                  ? `₹${(filteredExpenses.reduce((sum, e) => sum + e.amount, 0) / filteredExpenses.length).toFixed(2)}`
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">Top Category</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {filteredExpenses.length > 0
                  ? Object.entries(
                      filteredExpenses.reduce((acc, e) => {
                        acc[e.category] = (acc[e.category] || 0) + e.amount;
                        return acc;
                      }, {})
                    ).sort((a, b) => b[1] - a[1])[0][0]
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">Most Used Payment</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {filteredExpenses.length > 0
                  ? Object.entries(
                      filteredExpenses.reduce((acc, e) => {
                        const mode = e.paymentMode || "Other";
                        acc[mode] = (acc[mode] || 0) + 1;
                        return acc;
                      }, {})
                    ).sort((a, b) => b[1] - a[1])[0][0]
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 border border-purple-300 dark:border-purple-500/30 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Tips to Reduce Spending</h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Track your highest spending category and look for ways to optimize</li>
            <li>• Review your daily expenses to identify patterns and unnecessary purchases</li>
            <li>• Set monthly budgets based on your historical data</li>
            <li>• Download reports regularly to monitor your progress</li>
          </ul>
        </div>
      </div>
    </div>
  );
}