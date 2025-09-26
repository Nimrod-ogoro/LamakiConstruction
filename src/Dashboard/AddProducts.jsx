import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { fetchAPI } from "../api"; // ✅ global API helper

const Products = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setForm({ ...form, image: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);

      // ✅ Compress image before upload
      if (form.image) {
        const options = {
          maxSizeMB: 2, // keep under 2 MB
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(form.image, options);
        formData.append("image", compressedFile);
      }

      const res = await fetchAPI(
        "/api/products",
        {
          method: "POST",
          body: formData,
        },
        true // raw mode
      );

      if (!res.ok) {
        const data = await res.json();
        return alert("Error adding product: " + (data?.error || "Unknown error"));
      }

      alert("✅ Product added successfully!");
      setForm({ name: "", description: "", price: "", stock: "", image: null });
    } catch (err) {
      console.error(err);
      alert("Request failed");
    }
  };

  return (
    <div className="products-admin">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} />
        <div className="row">
          <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
          <input type="number" name="stock" placeholder="Stock" onChange={handleChange} required />
        </div>
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Products;

