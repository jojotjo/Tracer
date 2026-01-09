import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, isTokenExpired, logout } from "./utils/auth";
import { toast } from "react-toastify";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/AddExpense";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken(); 

    if (token && isTokenExpired()) {
      logout();
      toast.info("Session expired. Please login again.");
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <>
      <Navbar/>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-expense"
          element={
            <ProtectedRoute>
              <AddExpense />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}