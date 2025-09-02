import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import Button from "../components/ui/Button";
import { ShoppingCart, HardHat } from "lucide-react";
import { useNavigate } from "react-router";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQty = (id, delta) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(item.qty + delta, 1) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const iconForCategory = (category) => {
    switch (category?.toLowerCase()) {
      case "apparel":
      case "safety gear":
      case "tools":
        return <HardHat className="merch-icon" />;
      default:
        return <HardHat className="merch-icon" />;
    }
  };

  return (
    <section className="cart-section">
      <h2 className="cart-title">Your Cart</h2>

      <div className="cart-grid">
        {cart.length === 0 && <p>Your cart is empty</p>}

        {cart.map((item) => (
          <Card key={item.id} className="cart-card">
            <CardHeader className="cart-card-header">
              <div className="cart-media">
                <div className="cart-icon-wrap">{iconForCategory(item.category)}</div>
              </div>
            </CardHeader>

            <CardContent className="cart-card-body">
              <CardTitle className="cart-name">{item.name}</CardTitle>
              <p className="cart-desc">{item.description}</p>

              <div className="cart-bottom">
                <div className="cart-price">${(item.price * item.qty).toFixed(2)}</div>

                <div className="cart-actions">
                  <Button size="sm" onClick={() => updateQty(item.id, -1)}>-</Button>
                  <span>{item.qty}</span>
                  <Button size="sm" onClick={() => updateQty(item.id, 1)}>+</Button>
                  <Button size="sm" onClick={() => removeItem(item.id)}>Remove</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {cart.length > 0 && (
        <>
          <div className="cart-total">
            Total: ${total.toFixed(2)}
          </div>
          <Button
            className="checkout-btn"
            onClick={() => navigate("/CheckOut")}
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </section>
  );
}

