import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getToken,
  getUserFromToken,
  isTokenExpired,
  logout as clearToken,
} from "../utils/auth";
import { getTheme, setTheme } from "../utils/theme";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(getTheme() === "dark");
  const navigate = useNavigate();

  // Initialize theme on mount
  useEffect(() => {
    const theme = getTheme();
    setDarkMode(theme === "dark");
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    if (isTokenExpired()) {
      clearToken();
      setUser(null);
      toast.info("Session expired. Please login again.");
      navigate("/login", { replace: true });
    } else {
      setUser(getUserFromToken());
    }
  }, [navigate]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser(getUserFromToken());
  };

  const logout = () => {
    clearToken();
    setUser(null);
    navigate("/login");
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    setTheme(newDarkMode ? "dark" : "light");
  };

  const value = {
    user,
    setUser,
    isAuthenticated: Boolean(user),
    login,
    logout,
    darkMode,
    toggleDarkMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };