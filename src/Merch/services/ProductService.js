// services/productService.js
export const fetchProducts = async () => {
  const res = await fetch("https://lamaki-backend.vercel.app/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return await res.json();
};
