import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">
          Welcome to the Home Page
        </h2>
        <p className="text-gray-600 mb-6">
          You have successfully logged in! 🎉
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-red-600 transition duration-200 w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
