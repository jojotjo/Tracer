import React from "react";

export default function ExpenseCard({ expense, onDelete, onEdit }) {
  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-700 shadow rounded">
      <div>
        <h3 className="font-semibold">{expense.title}</h3>
        <p className="text-gray-500 text-sm">{expense.category}</p>

        {/* Date */}
        <p className="text-xs text-gray-400">
          {new Date(expense.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <p className="font-bold text-red-600">₹{expense.amount}</p>
        <button
          onClick={() => onDelete(expense._id)}
          className="text-sm text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={() => onEdit(expense)}
          className="text-sm text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
