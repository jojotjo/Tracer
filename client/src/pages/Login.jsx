import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { Wallet, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      login(res.data.token);
      toast.success("Login successful!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 text-slate-900 dark:text-white overflow-hidden flex items-center justify-center px-6 relative transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/50 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse transition-colors duration-300"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-200/50 dark:bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000 transition-colors duration-300"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div 
            className="flex items-center justify-center gap-2 mb-6 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-200">
              <Wallet className="text-white" size={32} />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all">
              Tracer
            </span>
          </div>
          
          <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800/50 dark:to-purple-900/30 backdrop-blur-md border border-gray-300 dark:border-purple-500/20 rounded-2xl p-8 space-y-6"
        >
          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-purple-600 dark:text-purple-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700/50 border border-gray-300 dark:border-purple-500/30 rounded-lg text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-purple-600 dark:text-purple-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-white dark:bg-slate-700/50 border border-gray-300 dark:border-purple-500/30 rounded-lg text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition">
              <input type="checkbox" className="rounded border-purple-500/30" />
              Remember me
            </label>
            <a href="#" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={20} />
              </>
            )}
          </button>

          {/* Divider
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-purple-500/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gradient-to-br dark:from-slate-800/50 dark:to-purple-900/30 text-gray-600 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div> */}

          {/* Social Login Buttons */}
          {/* <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="py-2 px-4 bg-gray-100 dark:bg-slate-700/50 border border-gray-300 dark:border-purple-500/20 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700/80 hover:border-gray-400 dark:hover:border-purple-500/40 transition-all"
            >
              Google
            </button>
            
          </div> */}
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition"
            >
              Sign up here
            </button>
          </p>
        </div>

        {/* Features Preview */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-200 dark:from-purple-500/20 to-pink-200 dark:to-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 border border-purple-300 dark:border-purple-500/30">
              <Wallet size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Track Expenses</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-200 dark:from-purple-500/20 to-pink-200 dark:to-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 border border-purple-300 dark:border-purple-500/30">
              <ArrowRight size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Smart Analytics</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-200 dark:from-purple-500/20 to-pink-200 dark:to-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 border border-purple-300 dark:border-purple-500/30">
              <Lock size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">100% Secure</p>
          </div>
        </div>
      </div>
    </div>
  );
}