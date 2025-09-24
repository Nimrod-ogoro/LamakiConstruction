// AddProject.jsx
import React, { useState } from "react";
import { fetchAPI } from "../api";
import imageCompression from "browser-image-compression";

const AddProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: [...files] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /* ---------- compress → R2 (signed URL) ---------- */
  const uploadFileToR2 = async (file) => {
    const compressed = await imageCompression(file, {
      maxSizeMB: 0.8,
      maxWidthOrHeight: 1600,
      useWebWorker: true,
    });

    const res = await fetchAPI(
      `/api/projects/signed-url?filename=${encodeURIComponent(file.name)}&mimetype=${compressed.type}`,
      { method: "GET" }
    );
    const { uploadURL, fileURL } = await res.json();

    await fetch(uploadURL, {
      method: "PUT",
      body: compressed,
      headers: {
        "Content-Type": compressed.type,
        "x-amz-acl": "public-read", // ← signed header
      },
    });

    return fileURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const urls = await Promise.all(
        Array.from(formData.images).map(uploadFileToR2)
      );

      const res = await fetchAPI("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          imageUrls: urls,
        }),
      });

      if (res.ok) {
        alert("✅ Project added!");
        setFormData({ name: "", description: "", images: [] });
      } else {
        const err = await res.json();
        alert("❌ " + (err?.error || "Failed"));
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Upload error");
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

