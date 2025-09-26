import React from "react";
import { useNavigate } from "react-router-dom";

const BackHomeNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* Logo block – identical markup / css */}
      <div className="logo-container">
        <img src="logo.png" alt="Logo" className="logo" />
        <h1 className="title">Lamaki Designs</h1>
      </div>

      {/* SINGLE link – uses the same .nav-button class */}
      <div className="desktop-nav">
        <button onClick={() => navigate("/")} className="nav-button">
          Back Home
        </button>
      </div>

      {/* Mobile hamburger is gone (only one link) – but if you want it, copy the
          hamburger + mobile-nav snippet from the original Navbar and replace
          the internal buttons with the same “Back Home” button. */}
    </nav>
  );
};

export default BackHomeNavbar;