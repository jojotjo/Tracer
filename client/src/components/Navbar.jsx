import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between">
      <h1 className="text-xl font-bold">Tracer</h1>

      <div className="space-x-4">
        <Link to="/">Dashboard</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="/add-expense">Add Expense</Link>
        <button onClick={logout} className="underline">
          Logout
        </button>
      </div>
    </nav>
  );
}
