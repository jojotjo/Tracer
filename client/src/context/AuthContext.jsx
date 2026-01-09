import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getToken,
  getUserFromToken,
  isTokenExpired,
  logout as clearToken,
} from "../utils/auth";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
