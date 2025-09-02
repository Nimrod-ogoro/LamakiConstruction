import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Button from "./ui/Button";
import { ShoppingCart, HardHat, CreditCard, Wallet } from "lucide-react";
import { useNavigate } from "react-router";
import Footer from "./Footer";
import AuthModal from "./authModal";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    // Show login modal if not logged in
    const isLoggedIn = !!localStorage.getItem("token");
    if (!isLoggedIn) setAuthOpen(true);
  }, []);

  const handlePayment = () => {
    if (!paymentMethod) return alert("Please select a payment method");

    // Mock payment process
    alert(`Payment successful via ${paymentMethod}`);
    localStorage.removeItem("cart");
    navigate("/merchandise");
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <>
      <nav className="navbar merch-navbar">
        <div className="logo-container">
          <img src="logo.png" alt="Logo" className="logo" />
          <h1 className="title">Lamaki Designs</h1>
        </div>
        <div className="desktop-nav">
          <Button onClick={() => navigate("/merchandise")}>Continue Shopping</Button>
        </div>
        <div className="mobile-nav">
          <Button onClick={() => navigate("/merchandise")}>Back</Button>
        </div>
      </nav>

      <section className="merch-section" style={{ marginTop: "120px" }}>
        <h2 className="merch-title">Checkout</h2>

        <div className="merch-grid">
          {cart.map((item) => (
            <Card key={item.id} className="merch-card">
              <CardHeader className="merch-card-header">
                <div className="merch-media" style={{ height: "150px", justifyContent: "center" }}>
                  <HardHat className="merch-icon" />
                </div>
              </CardHeader>
              <CardContent className="merch-card-body">
                <CardTitle className="merch-name">{item.name}</CardTitle>
                <p className="merch-desc">
                  Quantity: {item.qty} <br />
                  Price: ${item.price.toFixed(2)}
                </p>
                <div className="merch-price">
                  Total: ${(item.price * item.qty).toFixed(2)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="merch-footer" style={{ flexDirection: "column", gap: "15px" }}>
          <h3>Total Amount: ${cartTotal.toFixed(2)}</h3>

          <div className="payment-methods" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Button
              variant={paymentMethod === "M-Pesa" ? "cta" : "outline"}
              onClick={() => setPaymentMethod("M-Pesa")}
            >
              <Wallet /> M-Pesa
            </Button>
            <Button
              variant={paymentMethod === "PayPal" ? "cta" : "outline"}
              onClick={() => setPaymentMethod("PayPal")}
            >
              <Wallet /> PayPal
            </Button>
            <Button
              variant={paymentMethod === "Visa/MasterCard" ? "cta" : "outline"}
              onClick={() => setPaymentMethod("Visa/MasterCard")}
            >
              <CreditCard /> Card
            </Button>
          </div>

          <Button
            variant="cta"
            onClick={handlePayment}
            disabled={cart.length === 0 || !paymentMethod}
          >
            Complete Purchase
          </Button>
        </div>
      </section>

      <Footer />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}



