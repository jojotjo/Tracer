import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <Link to="/" className="font-bold text-lg">
        MyApp
      </Link>

      <div>
        {!user ? (
          <>
            <Link to="/login" className="mx-2">
              Login
            </Link>
            <Link to="/signup" className="mx-2">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="mx-2">
              Profile
            </Link>
            <button onClick={handleLogout} className="mx-2">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
