import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use 'react-router-dom' instead of 'react-router'
import api from "../lib/axios";
import { ArrowLeftIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // to redirect user after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };

    try {
      const response = await api.post("/auth/login", user);
      console.log(response.data);

      // Optional: store token if your backend sends one
      // localStorage.setItem("token", response.data.token);

      navigate("/"); // Redirect to protected route
      toast.success("user logged-in successfully!");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert(
        "Login failed: " +
          (error.response?.data?.message || "Check credentials")
      );
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black px-4">
      <Toaster />
      <div className="w-full max-w-md bg-zinc-800 rounded-2xl shadow-2xl p-8 space-y-6">
                    {/* Back Link */}
            <Link
          to="/"
          className="btn btn-outline border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black transition duration-200 mb-6"
        >
          <ArrowLeftIcon className="size-4 mr-2" />
          Back to Home
        </Link>
        <h2 className="text-3xl font-semibold text-center">
          Sign in to your account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-zinc-700 rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-zinc-700 rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="accent-purple-500 h-4 w-4"
              required
            />
            <label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <span className="underline cursor-pointer">
                terms & conditions
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-white transition-colors duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-zinc-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-400 hover:underline cursor-pointer"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
