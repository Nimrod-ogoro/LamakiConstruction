import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, updateQty, removeFromCart } from "./services/CartService";

import Footer from "../components/Footer";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  /* ---- load cart ---- */
  useEffect(() => {
    if (!token) { setLoading(false); return; }
    getCart(token)
      .then((data) => {
        console.log("🛒 cart from storage", data);
        setCart(data);
        localStorage.setItem("cart", JSON.stringify(data));
        setLoading(false);
      })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [token]);

  const handleUpdateQty = async (cartId, qty) => {
    if (qty < 1) return;
    await updateQty(cartId, qty, token);
    const updated = await getCart(token);
    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);
  };

  const handleRemove = async (cartId) => {
    await removeFromCart(cartId, token);
    const updated = await getCart(token);
    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);
  };

  const handleCheckout = () => {
    if (!token) return alert("Please log in");
    nav("/checkout");
  };

  /* ---------- inline fixed bar (no component) ---------- */
  const inlineBar = {
    background: "#ECF8F9",
    color: "#fff",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
  const logoStyle = { height: "50px", cursor: "pointer", width: "50px" };
  const backBtn = {
    background: "#ffffff",
    color: "#800000",
    border: "1px solid #800000",
    borderRadius: "4px",
    padding: "6px 12px",
    cursor: "pointer",
  };
  const logoTitle = { fontSize: "1rem", marginLeft: "0px", color: "#004d99", fontWeight: "bold", float: "left" };

  /* ---------- render ---------- */
  if (loading)
    return (
      <>
        <div style={inlineBar}>
          <img src="/logo.png" alt="Logo" style={logoStyle} onClick={() => nav("/MerchShop")} />
          <h1 className="logo-title d" style={logoTitle}>Lamaki Designs</h1>
          <button style={backBtn} onClick={() => nav("/MerchShop")}>Back to Shopping</button>
        </div>
        <div className="cart-container">
          <div className="cart-page">
            <h2 style={{ marginBottom: "15px", color: "#004d99" }}>Your Cart</h2>
            <div className="cart-empty">Loading cart...</div>
          </div>
        </div>
        <Footer />
      </>
    );

  if (!loading && cart.length === 0)
    return (
      <>
        <div style={inlineBar}>
          <img src="/logo.png" alt="Logo" style={logoStyle} onClick={() => nav("/MerchShop")} />
          <h1 className="logo-title d" style={logoTitle}>Lamaki Designs</h1>
          <button style={backBtn} onClick={() => nav("/MerchShop")}>Back to Shopping</button>
        </div>
        <div className="cart-container">
          <div className="cart-page">
            <h2 style={{ marginBottom: "15px", color: "#004d99" }}>Your Cart</h2>
            <div className="cart-empty">
              <h3>Your cart is empty</h3>
              <button style={{ marginTop: "10px", background: "#800000", color: "#fff", border: "none", borderRadius: "4px", padding: "8px 16px", cursor: "pointer" }} onClick={() => nav("/")}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );

  const total = cart.reduce((s, i) => s + i.quantity * Number(i.price || 0), 0);

  return (
    <>
      <div style={inlineBar}>
        <img src="/logo.png" alt="Logo" style={{ height: "30px", cursor: "pointer" }} onClick={() => nav("/MerchShop")} />
        <h1 className="logo-title d" style={logoTitle}>Lamaki Designs</h1>
        <button style={{ background: "#ffffff", color: "#800000", border: "1px solid #800000", borderRadius: "4px", padding: "6px 12px", cursor: "pointer" }} onClick={() => nav("/MerchShop")}>
          Back to Shopping
        </button>
      </div>
      <div className="cart-container">
        <div className="cart-page">
          <h2 style={{ marginBottom: "15px", color: "#004d99" }}>Your Cart</h2>

          {cart.map((item) => (
            <div className="cart-item" key={item.cart_id}>
              {item.image_url && (
                <img src={item.image_url} alt={item.name} className="cart-item-img" />
              )}
              <div className="cart-info">
                <h4>{item.name}</h4>
                <div className="cart-price">ksh{Number(item.price || 0).toFixed(2)} each</div>
              </div>

              <div className="cart-actions">
                <button className="qty-btn" onClick={() => handleUpdateQty(item.cart_id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button className="qty-btn" onClick={() => handleUpdateQty(item.cart_id, item.quantity + 1)}>+</button>
                <button className="remove-btn" onClick={() => handleRemove(item.cart_id)}>Remove</button>
              </div>
            </div>
          ))}

          <div className="cart-total">Total: ksh{total.toFixed(2)}</div>
          <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
          <div style={{ clear: "both" }} />
        </div>
      </div>
      <Footer />
    </>
  );
}
