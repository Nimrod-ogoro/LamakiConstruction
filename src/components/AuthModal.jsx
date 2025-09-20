import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../api";

const AuthModal = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

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
    const url = isLogin ? "/api/auth/login" : "/api/auth/register"; // ✅ /api added

    try {
      const res = await fetchAPI(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      let { token, user } = data;

      if (!token && !isLogin) {
        const loginRes = await fetchAPI("/api/auth/login", { // ✅ /api added
          method: "POST",
          body: JSON.stringify({ email: formData.email, password: formData.password }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const loginData = await loginRes.json();
        token = loginData.token;
        user = loginData.user;
      }

      if (token) localStorage.setItem("token", token);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        if (user.id) localStorage.setItem("userId", user.id);
      }

      onClose();
      navigate("/MerchShop");
    } catch (err) {
      console.error("❌ Auth error:", err.message);
      alert("Something went wrong");
    }
  };

  const handleGoogleAuth = () => {
    const baseURL = import.meta.env.VITE_API_URL?.trim() || "http://localhost:5000/api";
    window.location.href = `${baseURL}/auth/google`;
  };

  return (
    <div className="auth-backdrop">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="auth-tabs">
          <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>Signup</button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          )}
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="submit-btn">{isLogin ? "Login" : "Signup"}</button>
        </form>
        <button className="google-btn" onClick={handleGoogleAuth}>{isLogin ? "Login with Google" : "Signup with Google"}</button>
      </div>
    </div>
  );
};

export default AuthModal;



