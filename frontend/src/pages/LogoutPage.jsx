
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await api.post("/auth/logout"); 
        toast.success("Logged out successfully");
        navigate("/login"); 
      } catch (error) {
        toast.error("Failed to logout");
        console.error("Logout error:", error);
      }
    };

    logout();
  }, [navigate]);

  return null; 
};

export default LogoutPage;
