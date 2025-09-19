import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from "./services/ProductService";
import { getCart, addToCart as addToCartService } from "./services/CartService";
import AuthModal from "../components/AuthModal";

export default function MerchShop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [authOpen, setAuthOpen] = useState(false);
  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_URL; // ✅ base URL only

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

  /* ====== styles ====== */
  const plainCSS = { /* your styles */ };

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
                  src={`${baseURL}${p.image_url}`} // ✅ base URL + path
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