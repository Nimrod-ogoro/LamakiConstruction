import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import { ShoppingCart, Star, HardHat } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useNavigate } from "react-router";
import Footer from "./Footer";
import AuthModal from "./AuthModal"


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

export default function Merch() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [authOpen, setAuthOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const cartCount = cart.reduce((s, p) => s + p.qty, 0);

  const isLoggedIn = !!localStorage.getItem("token");

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Trigger auth modal on first interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!isLoggedIn && !hasPrompted) {
        setAuthOpen(true);
        setHasPrompted(true);
      }
    };
    const merchSection = document.getElementById("merchandise");
    if (merchSection) {
      merchSection.addEventListener("click", handleInteraction);
      merchSection.addEventListener("mousemove", handleInteraction);
    }
    return () => {
      if (merchSection) {
        merchSection.removeEventListener("click", handleInteraction);
        merchSection.removeEventListener("mousemove", handleInteraction);
      }
    };
  }, [isLoggedIn, hasPrompted]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...product, qty: 1 }];
    });
    toast({ title: "Added to cart", description: `${product.name} added` });
  };

  return (
    <>
      <nav className="navbard merch-navbar">
        <div className="logo-container">
          <img src="logo.png" alt="Logo" className="logo" />
          <h1 className="title">Lamaki Designs</h1>
        </div>

        <div className="desktop-navd">
          <div className="merch-cart">
            <ShoppingCart className="cart-icon" />
            <span className="cart-count">{cartCount}</span>
          </div>
          <button onClick={() => navigate('/')} className="nav-button">Home</button>
          <button onClick={() => navigate('/CheckOut')} className="nav-button">CheckOut</button>
        </div>

        <div className="mobile-navd">
          <div className="logo-container2">
            <img src="logo.png" alt="Logo" className="logo" />
            <h1 className="title">Lamaki Designs</h1>
          </div>
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/CheckOut')}>Cart ({cartCount})</button>
        </div>
      </nav>

      <section id="merchandise" className="merch-section">
        <div className="merch-header">
          <h2 className="merch-title">Lamaki Designs Merchandise</h2>
          <div className="merch-cart">
            <ShoppingCart className="cart-icon" />
            <span className="cart-count">{cartCount}</span>
          </div>
        </div>

        <div className="merch-grid">
          {products.map((product) => (
            <Card key={product.id} className="merch-card">
              <CardHeader className="merch-card-header">
                {product.image_url && (
                  <img src={`http://localhost:5000${product.image_url}`} alt={product.name} className="merch-image" />
                )}
                <div className="merch-icon-wrap">{iconForCategory(product.category)}</div>
                <Badge className="merch-badge">{product.category}</Badge>
                <div className="merch-rating">
                  <Star className="star-icon" />
                  <span className="rating-text">{product.rating ?? "0"}</span>
                </div>
              </CardHeader>

              <CardContent className="merch-card-body">
                <CardTitle className="merch-name">{product.name}</CardTitle>
                <p className="merch-desc">{product.description}</p>
                <div className="merch-bottom">
                  <div className="merch-price">
                    ${product.price !== undefined ? Number(product.price).toFixed(2) : "0.00"}
                  </div>
                  <div className="merch-actions">
                    <Button size="sm" onClick={() => addToCart(product)} className="add-btn">
                      <ShoppingCart className="btn-icon" /> Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="merch-footer">
          <Button variant="outline" onClick={() => navigate("/Cart")}>
            View Cart ({cartCount})
          </Button>
          <Button
            variant="cta"
            onClick={() => {
              localStorage.setItem("cart", JSON.stringify(cart));
              navigate("/CheckOut");
            }}
            disabled={cartCount === 0}
          >
            Checkout
          </Button>
        </div>
      </section>

      <Footer />
      < AuthModal  open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}



