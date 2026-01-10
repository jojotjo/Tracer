import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Wallet,
  LogOut,
  Home,
  Plus,
  List,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { useState } from "react";
import { BarChart3 } from "lucide-react";

export default function Navbar() {
  const { user, logout, darkMode, toggleDarkMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Don't show navbar on login/signup pages when not logged in
  if (!user && location.pathname !== "/") {
    return null;
  }

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed w-full z-50 bg-transparent backdrop-blur-md shadow-lg dark:shadow-purple-500/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center gap-2 text-2xl font-bold cursor-pointer group"
            onClick={() => {
              navigate("/");
              setIsOpen(false);
            }}
          >
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-200">
              <Wallet className="text-white" size={24} />
            </div>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all">
              Tracer
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-200 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {user ? (
              // LOGGED IN VIEW
              <>
                {/* User Info */}
                <div className="text-right border-r border-gray-300 dark:border-purple-500/30 pr-8">
                  <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-900 hover:bg-purple-100 dark:hover:bg-gradient-to-r dark:hover:from-purple-500/10 dark:hover:to-pink-500/10 rounded-lg transition-all duration-200"
                  >
                    <Home size={18} />
                    <span className="text-sm font-medium">Dashboard</span>
                  </button>

                  <button
                    onClick={() => navigate("/statistics")}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-900 hover:bg-purple-100 dark:hover:bg-gradient-to-r dark:hover:from-purple-500/10 dark:hover:to-pink-500/10 rounded-lg transition-all duration-200"
                  >
                    <BarChart3 size={18} />
                    <span>Statistics</span>
                  </button>

                  <button
                    onClick={() => navigate("/budget")}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-900 hover:bg-purple-100 dark:hover:bg-gradient-to-r dark:hover:from-purple-500/10 dark:hover:to-pink-500/10 rounded-lg transition-all duration-200"
                  >
                    <Wallet size={18} />
                    Budget
                  </button>

                  <button
                    onClick={() => navigate("/expenses")}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-900 hover:bg-purple-100 dark:hover:bg-gradient-to-r dark:hover:from-purple-500/10 dark:hover:to-pink-500/10 rounded-lg transition-all duration-200"
                  >
                    <List size={18} />
                    <span className="text-sm font-medium">Expenses</span>
                  </button>
                  <button
                    onClick={() => navigate("/add-expense")}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-900 hover:bg-purple-100 dark:hover:bg-gradient-to-r dark:hover:from-purple-500/10 dark:hover:to-pink-500/10 rounded-lg transition-all duration-200"
                  >
                    <Plus size={18} />
                    <span className="text-sm font-medium">Add</span>
                  </button>
                  {/* Dark Mode Toggle Button */}
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 mx-2 rounded-lg transition-colors hover:bg-purple-100 dark:hover:bg-purple-100"
                    title={
                      darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                    }
                  >
                    {darkMode ? (
                      <Sun size={20} className="text-purple-100 hover:text-purple-700" />
                    ) : (
                      <Moon size={20} className="text-gray-700 hover:text-purple-700" />
                    )}
                  </button>
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-5 py-2 ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 transform hover:scale-105"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              // NOT LOGGED IN VIEW
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-2 text-sm font-medium text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-200 transition-colors hover:bg-purple-100 dark:hover:bg-purple-500/10 rounded-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 transform hover:scale-105"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-gray-300 dark:border-purple-500/20 pt-4">
            {user ? (
              // LOGGED IN MOBILE
              <>
                <div className="px-4 py-3 bg-purple-100 dark:bg-gradient-to-r dark:from-purple-500/10 dark:to-pink-500/10 rounded-lg border border-purple-300 dark:border-purple-500/20 mb-4">
                  <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>

                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-100 hover:bg-purple-100 dark:hover:bg-gradient-to-r dark:hover:from-purple-500/10 dark:hover:to-pink-500/10 rounded-lg transition-all"
                >
                  <Home size={18} />
                  <span className="text-sm font-medium">Dashboard</span>
                </button>

                <button
                  onClick={() => {
                    navigate("/expenses");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-100 hover:bg-purple-100 dark:hover:bg-gradient-to-r dark:hover:from-purple-500/10 dark:hover:to-pink-500/10 rounded-lg transition-all"
                >
                  <List size={18} />
                  <span className="text-sm font-medium">Expenses</span>
                </button>

                <button
                  onClick={() => {
                    navigate("/add-expense");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-100 hover:bg-purple-100 dark:hover:bg-gradient-to-r dark:hover:from-purple-500/10 dark:hover:to-pink-500/10 rounded-lg transition-all"
                >
                  <Plus size={18} />
                  <span className="text-sm font-medium">Add Expense</span>
                </button>

                {/* Dark Mode Toggle - Mobile */}
                <button
                  onClick={toggleDarkMode}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-purple-300 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  {darkMode ? (
                    <>
                      <Sun size={18} className="text-yellow-400" />
                      <span className="text-sm font-medium">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={18} className="text-slate-600" />
                      <span className="text-sm font-medium">Dark Mode</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </>
            ) : (
              // NOT LOGGED IN MOBILE
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                  className="w-full px-6 py-3 text-sm font-medium text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-500/10 rounded-lg transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsOpen(false);
                  }}
                  className="w-full px-6 py-3 text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
