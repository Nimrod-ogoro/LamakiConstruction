import React, { useState } from "react";
import Button from "./ui/Button";
import { useNavigate } from "react-router";
import { Link } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-container">
        <img src="logo.png" alt="Logo" className="logo" />
        <h1 className="title">Lamaki Designs</h1>
      </div>

      {/* Desktop Nav */}
      <div className="desktop-nav">
      

        <button onClick={() => scrollToSection("about")} className="nav-button">
          About
        </button>
        <button
          onClick={() => scrollToSection("services")}
          className="nav-button"
        >
          Services
        </button>
        <button
          onClick={() => scrollToSection("contact")}
          className="nav-button"
        >
          Contact
        </button>
        <button
          onClick={() => scrollToSection("projects")}
          className="nav-button"
        >
          Projects
        </button>
        <button
            onClick={() => navigate("/MerchShop")}
            className="nav-button"
          >
            Merchandise
          </button>
          <button
            onClick={() => navigate("/Login")}
            className="nav-button"
          >
            Login
          </button>
          <Button href="#contact" variant="cta" size="sm" onClick={() => scrollToSection("contact")}>
         Get Quote
        </Button>
      </div>

      {/* Mobile Hamburger */}
      
      <div
        className="hamburger"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="mobile-nav">
          <button
            onClick={() => scrollToSection("about")}
            className="nav-button"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="nav-button"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="nav-button"
          >
            Contact
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="nav-button"
          >
            Projects
          </button>
          <button
            onClick={() => navigate("/MerchShop")}
            className="nav-button"
          >
            Merchandise
          </button>
          <button
            onClick={() => navigate("/Login")}
            className="nav-button"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

