import { useState } from "react";

export default function EditExpenseModal({ expense, onClose, onSave }) {
  const [form, setForm] = useState({
    amount: expense.amount,
    category: expense.category,
    date: expense.date ? expense.date.split('T')[0] : "", // Format for date input
    note: expense.note || "",
    paymentMode: expense.paymentMode || "Cash",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded w-96 space-y-3 shadow-lg"
      >
        <h2 className="text-xl font-bold">Edit Expense</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            className="border dark:bg-gray-700 dark:border-gray-600 w-full p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border dark:bg-gray-700 dark:border-gray-600 w-full p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border dark:bg-gray-700 dark:border-gray-600 w-full p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Note</label>
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            className="w-full border dark:bg-gray-700 dark:border-gray-600 p-2 rounded"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Payment Mode</label>
          <select
            name="paymentMode"
            value={form.paymentMode}
            onChange={handleChange}
            className="w-full border dark:bg-gray-700 dark:border-gray-600 p-2 rounded"
          >
            <option>Cash</option>
            <option>Card</option>
            <option>UPI</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}