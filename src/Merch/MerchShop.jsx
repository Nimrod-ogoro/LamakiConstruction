import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "./services/ProductService";
import { getCart, addToCart as addToCartService } from "./services/CartService";
import AuthModal from "../components/AuthModal";
import Footer from "../components/Footer";

export default function MerchShop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [authOpen, setAuthOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = token;
  const cartCount = cart.reduce((sum, i) => sum + (i.quantity || 0), 0);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  useEffect(() => {
    if (isLoggedIn) getCart().then(setCart).catch(console.error);
    else setCart([]);
  }, [isLoggedIn]);

  const addToCart = async (product) => {
    if (!isLoggedIn) {
      setAuthOpen(true);
      return;
    }
    try {
      await addToCartService(product.id, 1);

      /* ✔️ store real item in localStorage */
      const item = {
        cart_id: Date.now(),
        product_id: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
        image_url: product.image_url,
      };
      const current = JSON.parse(localStorage.getItem("cart") || "[]");
      const exists = current.find((i) => i.product_id === product.id);
      if (exists) exists.quantity += 1;
      else current.push(item);
      localStorage.setItem("cart", JSON.stringify(current));
      setCart(current);
    } catch (err) {
      if (err.message.includes("Session expired")) setAuthOpen(true);
      else alert("Could not add item");
    }
  };

  /* ====== modernized inline styles ====== */
  const plainCSS = {
    header: {
      background: "#ECF8F9",
      color: "#333",
      padding: "15px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "2px solid #800000",
    },
    btnPrimary: {
      background: "#0066cc",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "10px 14px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "background 0.2s ease",
      flex: 1,
    },
    btnPrimaryHover: {
      background: "#0052a3",
    },
    btnSecondary: {
      background: "#ffffff",
      color: "#800000",
      border: "1px solid #800000",
      borderRadius: "4px",
      padding: "6px 12px",
      cursor: "pointer",
    },
    container: { maxWidth: "1100px", margin: "20px auto", padding: "0 15px" },
    products: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: "24px",
      marginTop: "25px",
    },
    card: {
      background: "#ffffff",
      border: "1px solid #cce0ff",
      borderRadius: "12px",
      padding: "18px",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "pointer",
    },
    cardHover: {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    },
    cardImg: {
      width: "100%",
      height: "180px",
      objectFit: "cover",
      borderRadius: "10px",
      marginBottom: "12px",
      background: "#f0f7ff",
    },
    cardTitle: {
      margin: "8px 0",
      fontSize: "17px",
      fontWeight: "600",
      color: "#004d99",
      lineHeight: "1.4",
    },
    cardDesc: {
      fontSize: "14px",
      marginBottom: "12px",
      color: "#666",
      flexGrow: 1,
    },
    price: {
      fontWeight: "bold",
      fontSize: "16px",
      color: "#b30000",
      marginBottom: "14px",
    },
    actions: {
      display: "flex",
      gap: "10px",
      marginTop: "auto",
    },
    logo: { height: "60px", cursor: "pointer" },
  };

  return (
    <>
      <header style={plainCSS.header}>
        <img
          src="/logo.png"
          alt="Lamaki Designs Logo"
          onClick={() => navigate("/")}
          style={plainCSS.logo}
        />
        <h1>Lamaki Designs</h1>
        <div>
          <button
            style={plainCSS.btnSecondary}
            onClick={() => navigate("/Cart")}
          >
            Cart ({cartCount})
          </button>
        </div>
      </header>

      <div style={plainCSS.container}>
        <div style={plainCSS.products}>
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                ...plainCSS.card,
                ...(hoveredCard === p.id ? plainCSS.cardHover : {}),
              }}
              onMouseEnter={() => setHoveredCard(p.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {p.image_url && (
                <img src={p.image_url} alt={p.name} style={plainCSS.cardImg} />
              )}
              <h3 style={plainCSS.cardTitle}>{p.name}</h3>
              <p style={plainCSS.cardDesc}>{p.description}</p>
              <div style={plainCSS.price}>
                ksh{Number(p.price ?? 0).toFixed(2)}
              </div>
              <div style={plainCSS.actions}>
                <button
                  style={{
                    ...plainCSS.btnPrimary,
                    ...(hoveredBtn === p.id ? plainCSS.btnPrimaryHover : {}),
                  }}
                  onMouseEnter={() => setHoveredBtn(p.id)}
                  onMouseLeave={() => setHoveredBtn(null)}
                  onClick={() => addToCart(p)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
