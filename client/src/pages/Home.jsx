import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, TrendingDown, PieChart, Zap } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Take Control of Your
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Daily Expenses
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Tracer helps you track, analyze, and optimize your spending with ease.
            Simple, powerful, and built for your financial success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-200 transform hover:scale-105"
            >
              Get Started Free
            </button>
            <button
              onClick={() => {
                document
                  .getElementById("features")
                  .scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 border-2 border-purple-400 rounded-full font-semibold text-lg text-purple-300 hover:bg-purple-400/10 transition-all duration-200"
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <p className="text-3xl font-bold text-purple-400">10K+</p>
              <p className="text-sm text-gray-400">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-pink-400">₹100Cr+</p>
              <p className="text-sm text-gray-400">Tracked</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-400">24/7</p>
              <p className="text-sm text-gray-400">Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Powerful Features
            <span className="block text-lg text-gray-400 font-normal mt-2">
              Everything you need to manage your finances
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mb-4">
                <TrendingDown size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Track Expenses</h3>
              <p className="text-gray-400">
                Log every expense with category, date, and notes. Keep your
                spending organized and visible.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mb-4">
                <PieChart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Analytics</h3>
              <p className="text-gray-400">
                Get insights into your spending patterns. Filter by month, category,
                and analyze your financial habits.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mb-4">
                <Wallet size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Budget Planning</h3>
              <p className="text-gray-400">
                Set budgets and monitor your spending. Get alerts when you're close
                to your limits.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast & Secure</h3>
              <p className="text-gray-400">
                Lightning-fast performance with enterprise-grade security. Your data
                is always protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Create Account</h3>
              <p className="text-gray-400">
                Sign up with your email and create a secure account in seconds.
              </p>
            </div>

            <div className="relative text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Log Expenses</h3>
              <p className="text-gray-400">
                Add your daily expenses with just a few clicks. Categorize and add
                notes.
              </p>
            </div>

            <div className="relative text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Analyze & Save</h3>
              <p className="text-gray-400">
                View analytics, identify trends, and make smarter financial
                decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Take Control?
          </h2>
          <p className="text-lg text-purple-100 mb-8">
            Start tracking your expenses today. It's free and takes less than a minute.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="px-10 py-4 bg-white text-purple-600 font-bold rounded-full text-lg hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="text-purple-400" size={24} />
                <span className="font-bold text-lg">Tracer</span>
              </div>
              <p className="text-sm text-gray-400">
                Your personal expense tracker for daily financial management.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#features" className="hover:text-purple-400 transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400 transition">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-purple-400 transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400 transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-purple-400 transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400 transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2024 Tracer. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">Made with ❤️ for smarter spending</p>
          </div>
        </div>
      </footer>
    </div>
  );
}