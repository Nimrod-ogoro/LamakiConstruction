import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { createOrder } from "./services/OrderService";
import { initiateMpesaPayment } from "./services/Mpesa";
import { fetchAPI } from "../config/api"; // ✅ import API base
import Footer from "../components/Footer";

/* ---------- cart-style nav-bar ---------- */
function CartNav() {
  const nav = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const calc = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCount(cart.reduce((s, i) => s + (i.quantity || 0), 0));
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        background: "#ECF8F9",
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{ fontWeight: 700, fontSize: "1.1rem", color: "#004080", cursor: "pointer", marginLeft: "20px", display: "flex", alignItems: "center", flexDirection: "row" }}
        onClick={() => nav("/")}
      >
        <img src="/logo.png" alt="Logo" style={{ height: 40, marginRight: 8, verticalAlign: 'middle' }} />
        Lamaki Designs
      </div>
      <div style={{ position: "relative", cursor: "pointer" }} onClick={() => nav("/cart")}>
        <ShoppingCart size={26} color="#0077b6" />
        {count > 0 && (
          <span
            style={{
              position: "absolute",
              top: -6,
              right: -8,
              background: "#00b4d8",
              color: "#fff",
              fontSize: ".7rem",
              fontWeight: 600,
              borderRadius: "50%",
              width: 18,
              height: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {count > 99 ? "99+" : count}
          </span>
        )}
      </div>
    </header>
  );
}

/* ---------- checkout page ---------- */
export default function Checkout() {
  const nav = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    address: "",
    city: "",
    email: "",
  });

  const total = cart.reduce((s, i) => s + i.quantity * Number(i.price || 0), 0);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!form.phone || !form.address || !form.city || !form.email) {
      alert("Please fill all fields");
      return;
    }
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      alert("Cart is empty");
      return;
    }
    setLoading(true);
    try {
      const order = await createOrder({
        user_id: localStorage.getItem("userId") || 1,
        products: cart.map((i) => ({
          id: i.id,
          name: i.name,
          quantity: i.quantity,
          price: Number(i.price),
        })),
        total_price: total,
        status: "pending",
      });
      await initiateMpesaPayment({
        phone: form.phone.replace(/^0/, "254"),
        amount: total,
        orderId: order.id,
      });
      localStorage.removeItem("cart");
      nav("/orderSuccess");
    } catch (err) {
      console.error(err);
      alert("Payment failed: " + err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <CartNav />
      <div className="checkout-container">
        <div className="checkout-card">
          <h2>Checkout</h2>

          <table className="checkout-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.cart_id || item.id}>
                  <td className="item-cell">
                    {item.image_url && (
                      <img src={`${fetchAPI}${item.image_url}`} alt={item.name} />
                    )}
                    <span>{item.name}</span>
                  </td>
                  <td>{item.quantity}</td>
                  <td>${Number(item.price || 0).toFixed(2)}</td>
                  <td>${(item.quantity * Number(item.price || 0)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">Total</td>
                <td className="total-cell">${total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <form className="checkout-form" onSubmit={handleCheckout}>
            <h3>Delivery Details</h3>
            <label>
              Phone (M-Pesa) *
              <input name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="07xxxxxxxx" />
            </label>
            <label>
              Email *
              <input name="email" type="email" required value={form.email} onChange={handleChange} />
            </label>
            <label>
              Delivery Address *
              <textarea name="address" required value={form.address} onChange={handleChange} rows={3} />
            </label>
            <label>
              City *
              <input name="city" required value={form.city} onChange={handleChange} />
            </label>

            <button type="submit" className="pay-btn" disabled={loading || cart.length === 0}>
              {loading ? "Sending STK Push..." : "Pay with M-Pesa"}
            </button>
            {loading && <div className="spinner">⏳ Awaiting payment...</div>}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
