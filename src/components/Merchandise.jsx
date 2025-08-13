import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import  Button  from "./ui/Button";
import  Badge  from "./ui/Badge";
import { ShoppingCart, Star, HardHat } from "lucide-react";
import  {useToast}  from "../hooks/use-toast";



const iconForCategory = (category) => {
  switch (category?.toLowerCase()) {
    case "apparel":
      return <HardHat className="merch-icon" />;
    case "safety gear":
      return <HardHat className="merch-icon" />;
    case "tools":
      return <HardHat className="merch-icon" />;
    default:
      return <HardHat className="merch-icon" />;
  }
};

const products = [
  {
    id: "1",
    name: "BuildWell Hard Hat",
    price: 39.99,
    image: null,
    rating: 4.8,
    description: "OSHA-compliant safety hard hat with BuildWell branding",
    category: "Safety Gear",
  },
  {
    id: "2",
    name: "Safety Vest",
    price: 24.99,
    image: null,
    rating: 4.9,
    description: "High-visibility safety vest with reflective strips",
    category: "Safety Gear",
  },
  {
    id: "3",
    name: "Work Boots",
    price: 129.99,
    image: null,
    rating: 4.7,
    description: "Steel toe work boots for maximum protection",
    category: "Footwear",
  },
  {
    id: "4",
    name: "BuildWell T-Shirt",
    price: 19.99,
    image: null,
    rating: 4.6,
    description: "Comfortable cotton t-shirt with company logo",
    category: "Apparel",
  },
  {
    id: "5",
    name: "Hoodie",
    price: 49.99,
    image: null,
    rating: 4.8,
    description: "Warm fleece hoodie perfect for cool mornings",
    category: "Apparel",
  },
  {
    id: "6",
    name: "Tool Belt",
    price: 79.99,
    image: null,
    rating: 4.9,
    description: "Heavy-duty leather tool belt with multiple pockets",
    category: "Tools",
  },
];

export default function Merchandise() {
  const [cart, setCart] = useState([]); // array of {id, name, price, qty}
  const { toast } = useToast();

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...product, qty: 1 }];
    });
    toast({ title: "Added to cart", description: `${product.name} added` });
  };

  const cartCount = cart.reduce((s, p) => s + p.qty, 0);

  return (
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
              <div className="merch-media">
                {/* icon placeholder */}
                <div className="merch-icon-wrap">
                  {iconForCategory(product.category)}
                </div>

                <Badge className="merch-badge">{product.category}</Badge>

                <div className="merch-rating">
                  <Star className="star-icon" />
                  <span className="rating-text">{product.rating}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="merch-card-body">
              <CardTitle className="merch-name">{product.name}</CardTitle>
              <p className="merch-desc">{product.description}</p>

              <div className="merch-bottom">
                <div className="merch-price">${product.price.toFixed(2)}</div>
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
        <Button variant="outline" onClick={() => window.location.href = "/cart"}>
          View Cart ({cartCount})
        </Button>
        <Button variant="cta" onClick={() => {
          // go to checkout page with current cart (simple approach: store in localStorage)
          localStorage.setItem('cart', JSON.stringify(cart));
          window.location.href = "/checkout";
        }} disabled={cartCount === 0}>
          Checkout
        </Button>
      </div>
    </section>
  );
}



