import React, { useState } from "react";
import { fetchAPI } from "../api"; // ✅ global API helper

const AddProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
  });
  const [uploading, setUploading] = useState(false);

  // Handle text + file inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: [...files] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 🔥 Upload a single file directly to R2 via signed URL
  const uploadFileToR2 = async (file) => {
    // 1. Get signed upload URL from backend
    const res = await fetchAPI(
      `/api/upload-url?filename=${encodeURIComponent(file.name)}&type=${file.type}`,
      { method: "GET" }
    );
    const { uploadURL, fileURL } = await res.json();

    // 2. PUT directly to R2
    await fetch(uploadURL, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    return fileURL; // ✅ final public R2 URL
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Upload all images first
      const uploadedURLs = [];
      for (const img of formData.images) {
        const url = await uploadFileToR2(img);
        uploadedURLs.push(url);
      }

      // Send metadata + image URLs to backend
      const res = await fetchAPI("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          images: uploadedURLs, // ✅ store only URLs
        }),
      });

      if (res.ok) {
        alert("✅ Project added successfully!");
        setFormData({ name: "", description: "", images: [] });
      } else {
        const errData = await res.json();
        alert("❌ Failed to add project: " + (errData?.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error uploading project");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-container">
      <h2>Add Project</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <label>Project Title</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Upload Images</label>
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit" className="btn-primary" disabled={uploading}>
          {uploading ? "Uploading..." : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default AddProject;

