import { useState } from "react";

export default function EditExpenseModal({ expense, onClose, onSave }) {
  const [form, setForm] = useState({
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    description: expense.description || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-96 space-y-3"
      >
        <h2 className="text-xl font-bold">Edit Expense</h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border dark:bg-gray-800 dark:text-white w-full p-2 rounded"
          required
        />

        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          className="border dark:bg-gray-800 dark:text-white w-full p-2 rounded"
          required
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border dark:bg-gray-800 dark:text-white w-full p-2 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-4 py-1 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
