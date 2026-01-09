import { useState } from "react";
import { addExpense } from "../services/expenseService";
import { toast } from "react-toastify";
import { DollarSign, Tag, Calendar, FileText, CreditCard, Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddExpense() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = ["Food", "Transport", "Entertainment", "Shopping", "Bills", "Health", "Education", "Other"];
  const paymentModes = ["Cash", "Card", "UPI"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addExpense({
        amount: Number(amount),
        category,
        date,
        note,
        paymentMode,
      });

      toast.success("Expense added successfully!");

      // Reset form
      setAmount("");
      setCategory("Food");
      setDate("");
      setNote("");
      setPaymentMode("Cash");

      // Redirect to expenses page
      setTimeout(() => navigate("/expenses"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-20 px-6">
      {/* Animated background elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-20 right-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate("/expenses")}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition mb-6"
          >
            <ArrowLeft size={20} />
            Back to Expenses
          </button>
          
          <h1 className="text-5xl font-bold mb-2">Add Expense</h1>
          <p className="text-gray-400">Track your spending with detailed information</p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-md border border-purple-500/20 rounded-2xl p-8 space-y-6"
        >
          {/* Amount Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Amount *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-3.5 text-purple-400" size={20} />
              <input
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Category *
            </label>
            <div className="relative">
              <Tag className="absolute left-4 top-3.5 text-purple-400" size={20} />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 appearance-none"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900">
                    {cat}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-3.5 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>
          </div>

          {/* Date Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-3.5 text-purple-400" size={20} />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Payment Mode */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Payment Mode *
            </label>
            <div className="relative">
              <CreditCard className="absolute left-4 top-3.5 text-purple-400" size={20} />
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 appearance-none"
                required
              >
                {paymentModes.map((mode) => (
                  <option key={mode} value={mode} className="bg-slate-900">
                    {mode}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-3.5 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>
          </div>

          {/* Note Textarea */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Note (Optional)
            </label>
            <div className="relative">
              <FileText className="absolute left-4 top-3.5 text-purple-400" size={20} />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add any additional notes about this expense..."
                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 resize-none"
                rows="3"
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <p className="text-sm text-purple-300">
              💡 <span className="font-medium">Tip:</span> Make sure all required fields (marked with *) are filled before submitting.
            </p>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/expenses")}
              className="px-6 py-3 border-2 border-purple-500/30 text-purple-300 rounded-lg font-semibold hover:bg-purple-500/10 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Add Expense
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-md border border-purple-500/20 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Common Categories</p>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 4).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="px-3 py-1 text-xs bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 rounded-full transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-md border border-purple-500/20 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Payment Methods</p>
            <div className="flex gap-2">
              {paymentModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setPaymentMode(mode)}
                  className="flex-1 px-3 py-1 text-xs bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 rounded-full transition-all"
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-md border border-purple-500/20 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Today's Date</p>
            <p className="text-lg font-semibold text-purple-300">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <button
              onClick={() => setDate(new Date().toISOString().split("T")[0])}
              className="mt-2 text-xs px-3 py-1 bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 rounded transition-all"
            >
              Use Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}