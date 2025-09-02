import React from "react";
import { ShoppingCart } from "lucide-react";
import Button from './ui/Button';
import { useNavigate } from 'react-router';

const MerchNav = ({ cartCount }) => {
  const navigate = useNavigate();

  return (
    <nav className=" merch-navbar">
      <div className="logo-container">
        <img src="logo.png" alt="Logo" className="logo" />
        <h1 className="title">Lamaki Designs</h1>
      </div>

      {/* Desktop Navigation */}
      <div className="desktop-nav">
        <div className="merch-cart">
          <ShoppingCart className="cart-icon" />
          <span className="cart-count">{cartCount}</span>
        </div>
        <button onClick={() => navigate('/')} className="nav-button">Home</button>
        <button onClick={() => navigate('/CheckOut')} className="nav-button">CheckOut</button>
      </div>

      {/* Mobile Menu */}
      <div className="mobile-nav">
        <button  onClick={() => navigate('/')} className="mobile-btn2">Home</button>
        <button  onClick={() => navigate('/CheckOut')} className="mobile-btn2">
          Cart ({cartCount})
        </button>
      </div>
    </nav>
  );
};

export default MerchNav;
