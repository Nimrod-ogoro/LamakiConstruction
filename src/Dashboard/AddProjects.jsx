import React, { useState } from "react";

const AddProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: [...files] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // prepare data for API
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formData.images.forEach((img) => {
      formDataToSend.append("images", img);
    });

    try {
      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        body: formDataToSend,
      });
      if (res.ok) {
        alert("✅ Project added successfully!");
        setFormData({
          name: "",
          description: "",
          images: [],
        });
      } else {
        alert("❌ Failed to add project");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error adding project");
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

        <button type="submit" className="btn-primary">
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;