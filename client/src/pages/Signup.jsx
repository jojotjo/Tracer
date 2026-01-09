import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { Wallet, Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function Signup() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Already logged in → redirect
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);

    try {
      await signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login", { replace: true }), 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Signup failed";
      toast.error(errorMessage);
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden flex items-center justify-center px-6 relative py-12">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

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
          
          <h1 className="text-4xl font-bold mb-2">Get Started</h1>
          <p className="text-gray-400">Create your account in seconds</p>
        </div>

        {/* Signup Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-md border border-purple-500/20 rounded-2xl p-8 space-y-5"
        >
          {/* Full Name Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-purple-400" size={20} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-purple-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-purple-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-purple-400 hover:text-purple-300 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500">At least 6 characters</p>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-purple-400" size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3.5 text-purple-400 hover:text-purple-300 transition"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Terms & Conditions */}
          <label className="flex items-start gap-3 cursor-pointer text-sm">
            <input
              type="checkbox"
              className="mt-1 rounded border-purple-500/30 w-4 h-4"
              required
            />
            <span className="text-gray-400">
              I agree to the{" "}
              <a href="#" className="text-purple-400 hover:text-purple-300 transition">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-purple-400 hover:text-purple-300 transition">
                Privacy Policy
              </a>
            </span>
          </label>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight size={20} />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-500/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-slate-800/50 to-purple-900/30 text-gray-400">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Social Signup Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="py-2 px-4 bg-slate-700/50 border border-purple-500/20 rounded-lg text-sm font-medium text-gray-300 hover:bg-slate-700/80 hover:border-purple-500/40 transition-all"
            >
              Google
            </button>
            <button
              type="button"
              className="py-2 px-4 bg-slate-700/50 border border-purple-500/20 rounded-lg text-sm font-medium text-gray-300 hover:bg-slate-700/80 hover:border-purple-500/40 transition-all"
            >
              GitHub
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-purple-400 hover:text-purple-300 font-semibold transition"
            >
              Log in here
            </button>
          </p>
        </div>

        {/* Benefits Preview */}
        <div className="mt-12 space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle size={20} className="text-purple-400 flex-shrink-0" />
            <span className="text-gray-400">No credit card required</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle size={20} className="text-purple-400 flex-shrink-0" />
            <span className="text-gray-400">Free forever plan available</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle size={20} className="text-purple-400 flex-shrink-0" />
            <span className="text-gray-400">Full access to all features</span>
          </div>
        </div>
      </div>
    </div>
  );
}