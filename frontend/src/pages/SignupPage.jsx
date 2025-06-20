import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import api from "../lib/axios";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/signup", {
        fullName,
        email,
        password,
        confirmPassword,
      });
      console.log(response.data);
      navigate("/");
      toast.success("Signup successful,Please log in ",{
          duration:30000,
      });
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-800 text-white p-8 rounded-2xl shadow-2xl space-y-6">
        <h2 className="text-3xl font-bold text-center">Create an Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 bg-zinc-900 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-zinc-900 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-zinc-900 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-zinc-900 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              id="terms"
              className="accent-purple-500 w-4 h-4"
              required
            />
            <label htmlFor="terms">
              I agree to the{" "}
              <a href="#" className="underline">
                Terms & Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-xl transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
