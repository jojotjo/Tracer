import { useEffect, useState } from "react";
import { getExpenses, deleteExpense } from "../services/expenseService";
import ExpenseCard from "../components/ExpenseCard";
import { toast } from "react-toastify";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

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

  const filterByMonth = (expenses, month) => {
    if (!month) return expenses;
    return expenses.filter((expense) => {
      return expense.createdAt.slice(0, 7) === month;
    });
  };

  const filteredExpenses = filterByMonth(expenses, selectedMonth);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4">
      <h2 className="text-2xl font-bold mb-4">Your Expenses</h2>

      <div className="flex items-center gap-4 mb-4">
        <label className="font-medium">Filter by month:</label>
        <input
          type="month"
          className="border px-3 py-2 rounded"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
        {selectedMonth && (
          <button
            onClick={() => setSelectedMonth("")}
            className="text-sm text-blue-600 underline"
          >
            Clear
          </button>
        )}
      </div>

      {filteredExpenses.length === 0 ? (
        <p className="text-gray-500">No expenses found</p>
      ) : (
        <div className="space-y-3">
          {filteredExpenses.map((expense) => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
