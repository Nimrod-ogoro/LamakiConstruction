import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "./services/ProductService";
import { getCart, addToCart as addToCartService } from "./services/CartService";
import AuthModal from "../components/AuthModal";

export default function MerchShop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [authOpen, setAuthOpen] = useState(false);
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

      /*  ✔️  store real item in localStorage  */
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

  /* ====== your existing inline styles ====== */
  const plainCSS = {
    header: {
      background: "#cce5ff",
      color: "#333",
      padding: "15px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "2px solid #800000",
    },
    btnPrimary: {
      background: "#800000",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "6px 12px",
      cursor: "pointer",
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
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    card: {
      background: "#ffffff",
      border: "1px solid #99ccff",
      borderRadius: "6px",
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    cardImg: {
      width: "100%",
      height: "160px",
      objectFit: "cover",
      borderRadius: "4px",
      marginBottom: "10px",
      background: "#e6f2ff",
    },
    cardTitle: { margin: "8px 0", fontSize: "16px", color: "#004d99" },
    cardDesc: { fontSize: "13px", marginBottom: "10px", color: "#555" },
    price: {
      fontWeight: "bold",
      fontSize: "15px",
      color: "#800000",
      marginBottom: "10px",
    },
    actions: { display: "flex", gap: "8px", marginTop: "auto" },
  };

  return (
    <>
      <header style={plainCSS.header}>
        <h1>Lamaki Designs</h1>
        <div>
          <button style={plainCSS.btnSecondary} onClick={() => navigate("/Cart")}>
            Cart ({cartCount})
          </button>
        </div>
      </header>

      <div style={plainCSS.container}>
        <div style={plainCSS.products}>
          {products.map((p) => (
            <div style={plainCSS.card} key={p.id}>
              {p.image_url && (
                <img
                  src={p.image_url} // ✅ use the full URL directly
                  alt={p.name}
                  style={plainCSS.cardImg}
                />
              )}
              <h3 style={plainCSS.cardTitle}>{p.name}</h3>
              <p style={plainCSS.cardDesc}>{p.description}</p>
              <div style={plainCSS.price}>${Number(p.price ?? 0).toFixed(2)}</div>
              <div style={plainCSS.actions}>
                <button style={plainCSS.btnPrimary} onClick={() => addToCart(p)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

