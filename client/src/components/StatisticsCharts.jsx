import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { TrendingUp, Calendar, DollarSign, PieChart as PieIcon } from "lucide-react";

const COLORS = ["#8b5cf6", "#ec4899", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#6366f1", "#14b8a6"];

export default function StatisticsCharts({ expenses }) {
  const [timeRange, setTimeRange] = useState("month"); // month, quarter, year, all

  // Calculate category-wise expenses
  const categoryData = useMemo(() => {
    const categoryMap = {};
    expenses.forEach((expense) => {
      if (!categoryMap[expense.category]) {
        categoryMap[expense.category] = 0;
      }
      categoryMap[expense.category] += expense.amount;
    });

    return Object.entries(categoryMap)
      .map(([name, value]) => ({
        name,
        value: parseFloat(value.toFixed(2)),
      }))
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  // Calculate monthly trend
  const monthlyTrend = useMemo(() => {
    const monthMap = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date || expense.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      if (!monthMap[monthKey]) {
        monthMap[monthKey] = 0;
      }
      monthMap[monthKey] += expense.amount;
    });

    return Object.entries(monthMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-12) // Last 12 months
      .map(([month, total]) => ({
        month: new Date(month + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        total: parseFloat(total.toFixed(2)),
      }));
  }, [expenses]);

  // Calculate daily trend for current month
  const dailyTrend = useMemo(() => {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const dayMap = {};

    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date || expense.createdAt);
      const expenseMonth = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, "0")}`;

      if (expenseMonth === currentMonth) {
        const day = expenseDate.getDate();
        if (!dayMap[day]) {
          dayMap[day] = 0;
        }
        dayMap[day] += expense.amount;
      }
    });

    return Object.entries(dayMap)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([day, total]) => ({
        day: `Day ${day}`,
        total: parseFloat(total.toFixed(2)),
      }));
  }, [expenses]);

  // Calculate payment mode breakdown
  const paymentModeData = useMemo(() => {
    const modeMap = {};
    expenses.forEach((expense) => {
      const mode = expense.paymentMode || "Other";
      if (!modeMap[mode]) {
        modeMap[mode] = 0;
      }
      modeMap[mode] += expense.amount;
    });

    return Object.entries(modeMap).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
    }));
  }, [expenses]);

  // Statistics
  const stats = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const average = expenses.length > 0 ? total / expenses.length : 0;
    const highest = expenses.length > 0 ? Math.max(...expenses.map((e) => e.amount)) : 0;
    const lowest = expenses.length > 0 ? Math.min(...expenses.map((e) => e.amount)) : 0;

    return {
      total: parseFloat(total.toFixed(2)),
      average: parseFloat(average.toFixed(2)),
      highest: parseFloat(highest.toFixed(2)),
      lowest: parseFloat(lowest.toFixed(2)),
      count: expenses.length,
    };
  }, [expenses]);

  if (expenses.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800/50 dark:to-purple-900/30 backdrop-blur-md border border-gray-300 dark:border-purple-500/20 rounded-2xl p-12 text-center">
        <PieIcon size={48} className="text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <p className="text-gray-700 dark:text-gray-400 mb-2">No expenses to display</p>
        <p className="text-gray-600 dark:text-gray-500 text-sm">Add expenses to see statistics and charts</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Spending"
          value={`₹${stats.total}`}
          icon={DollarSign}
          color="from-purple-500 to-pink-500"
        />
        <StatCard
          title="Average Expense"
          value={`₹${stats.average}`}
          icon={TrendingUp}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Highest Expense"
          value={`₹${stats.highest}`}
          icon={TrendingUp}
          color="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Total Transactions"
          value={stats.count}
          icon={Calendar}
          color="from-orange-500 to-red-500"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown - Pie Chart */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800/50 dark:to-purple-900/30 backdrop-blur-md border border-gray-300 dark:border-purple-500/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ₹${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `₹${value.toFixed(2)}`}
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Category List */}
          <div className="mt-6 space-y-2 max-h-40 overflow-y-auto">
            {categoryData.map((cat, index) => (
              <div key={cat.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-slate-700 dark:text-gray-300">{cat.name}</span>
                </div>
                <span className="font-semibold text-slate-900 dark:text-white">₹{cat.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Mode - Pie Chart */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800/50 dark:to-purple-900/30 backdrop-blur-md border border-gray-300 dark:border-purple-500/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Payment Methods</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentModeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ₹${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentModeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `₹${value.toFixed(2)}`}
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Payment Mode List */}
          <div className="mt-6 space-y-2">
            {paymentModeData.map((mode, index) => (
              <div key={mode.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-slate-700 dark:text-gray-300">{mode.name}</span>
                </div>
                <span className="font-semibold text-slate-900 dark:text-white">₹{mode.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trend - Line Chart */}
      {monthlyTrend.length > 0 && (
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800/50 dark:to-purple-900/30 backdrop-blur-md border border-gray-300 dark:border-purple-500/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Monthly Trend (Last 12 Months)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                formatter={(value) => `₹${value.toFixed(2)}`}
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: "#8b5cf6", r: 4 }}
                activeDot={{ r: 6 }}
                name="Total Spending"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Daily Trend - Bar Chart */}
      {dailyTrend.length > 0 && (
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800/50 dark:to-purple-900/30 backdrop-blur-md border border-gray-300 dark:border-purple-500/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Daily Expenses (Current Month)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dailyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                formatter={(value) => `₹${value.toFixed(2)}`}
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend />
              <Bar
                dataKey="total"
                fill="#8b5cf6"
                radius={[8, 8, 0, 0]}
                name="Daily Spending"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
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