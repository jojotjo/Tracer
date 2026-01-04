import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../services/expenseService";

export default function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !amount) {
      return setError("Title and amount are required");
    }

    try {
      await addExpense({
        title,
        amount: Number(amount),
        category,
      });

      navigate("/expenses");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Add Expense
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 p-2 mb-3 rounded">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="w-full mb-4 px-3 py-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Other</option>
        </select>

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Add Expense
        </button>
      </form>
    </div>
  );
}
