import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // ✅ Handle token & user returned from Google redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user");

    if (token) {
      localStorage.setItem("token", token);
      try {
        const parsedUser = user ? JSON.parse(decodeURIComponent(user)) : null;
        if (parsedUser) {
          localStorage.setItem("user", JSON.stringify(parsedUser));
          if (parsedUser.id) localStorage.setItem("userId", parsedUser.id);
        }
      } catch (err) {
        console.error("❌ Failed to parse Google user:", err);
      }
      window.history.replaceState({}, document.title, window.location.pathname);
      onClose();
      navigate("/MerchShop");
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
      let { token, user } = res.data;

      // ✅ If signup didn’t return a token, auto-login
      if (!token && !isLogin) {
        const loginRes = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email: formData.email, password: formData.password },
          { withCredentials: true }
        );
        token = loginRes.data.token;
        user = loginRes.data.user;
      }

      if (token) localStorage.setItem("token", token);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        if (user.id) localStorage.setItem("userId", user.id);
      }

      onClose();
      navigate("/MerchShop");
    } catch (err) {
      console.error("❌ Auth error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="auth-backdrop">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <div className="auth-tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

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

        <button className="google-btn" onClick={handleGoogleAuth}>
          {isLogin ? "Login with Google" : "Signup with Google"}
        </button>
      </div>
    </div>
  );
};

export default AuthModal;


