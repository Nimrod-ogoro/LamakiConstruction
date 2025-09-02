import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthModal({ open, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  // ✅ Handle token from Google redirect
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      if (token) {
        localStorage.setItem("token", token);
        window.history.replaceState({}, document.title, window.location.pathname); // clean URL
        onClose(); // close modal
        navigate("/merchandise");
      }
    }, [navigate, onClose]);
  
    if (!open) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    try {
      const res = await axios.post(url, formData, { withCredentials: true });

      // Assuming backend returns { token, user }
      const { token, user } = res.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      onClose(); // close modal
      navigate("/merchandise"); // redirect
    } catch (err) {
      console.error("❌ Auth error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleAuth = () => {
    // ✅ Full redirect flow to backend Google OAuth
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="auth-backdrop">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        {/* Tabs */}
        <div className="auth-tabs">
          <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>Signup</button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        {/* Google Auth */}
        <button className="google-btn" onClick={handleGoogleAuth}>
          {isLogin ? "Login with Google" : "Signup with Google"}
        </button>
      </div>
    </div>
  );
}
