import React, { useState, useEffect } from "react";
import AddProjects from "./AddProjects";
import AddProducts from "./AddProducts";
import Users from "./Users";
import Oders from "./Oders";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [overviewData, setOverviewData] = useState({
    projects: [],
    products: [],
    users: [],
    orders: [],
  });

  useEffect(() => {
    if (activeSection === "dashboard") {
      fetchAllData();
    }
  }, [activeSection]);

  // ✅ Fetch all overview data
  const fetchAllData = async () => {
    try {
      const [projectsRes, productsRes, usersRes, ordersRes] = await Promise.all([
        fetch("http://localhost:5000/api/projects"),
        fetch("http://localhost:5000/api/products"),
        fetch("http://localhost:5000/api/auth/users"), // ✅ correct endpoint
        fetch("http://localhost:5000/api/orders"),
      ]);

      if (!projectsRes.ok || !productsRes.ok || !usersRes.ok || !ordersRes.ok) {
        throw new Error("One or more resources failed to load");
      }

      const [projects, products, users, orders] = await Promise.all([
        projectsRes.json(),
        productsRes.json(),
        usersRes.json(),
        ordersRes.json(),
      ]);

      setOverviewData({ projects, products, users, orders });
    } catch (error) {
      console.error("Error fetching overview data:", error);
    }
  };

  // ✅ Delete Project
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setOverviewData((prev) => ({
          ...prev,
          projects: prev.projects.filter((p) => p.id !== id),
        }));
      }
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  // ✅ Delete Product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setOverviewData((prev) => ({
          ...prev,
          products: prev.products.filter((p) => p.id !== id),
        }));
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // ✅ Delete User
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/auth/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setOverviewData((prev) => ({
          ...prev,
          users: prev.users.filter((u) => u.id !== id),
        }));
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // ✅ Delete Order
  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setOverviewData((prev) => ({
          ...prev,
          orders: prev.orders.filter((o) => o.id !== id),
        }));
      }
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  // ✅ Content switcher
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div>
            <h2>📊 Dashboard Overview</h2>
            <div className="overview-cardds">
              <div className="cardd">
                <h3 className="h3">Projects</h3>
                <p>{overviewData.projects.length}</p>
              </div>
              <div className="cardd">
                <h3 className="h3">Products</h3>
                <p>{overviewData.products.length}</p>
              </div>
              <div className="cardd">
                <h3 className="h3">Users</h3>
                <p>{overviewData.users.length}</p>
              </div>
              <div className="cardd">
                <h3 className="h3">Orders</h3>
                <p>{overviewData.orders.length}</p>
              </div>
            </div>

            <div className="data-tables">
              <h3 className="h3">All Projects</h3>
              <ul>
                {overviewData.projects.map((p) => (
                  <li key={p.id}>
                    {p.name || p.title}
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteProject(p.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>

              <h3>All Products</h3>
              <ul>
                {overviewData.products.map((p) => (
                  <li key={p.id}>
                    {p.name}
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteProduct(p.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>

              <h3>All Users</h3>
              <ul>
                {overviewData.users.map((u) => (
                  <li key={u.id}>
                    {u.username || u.email}
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteUser(u.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>

              <h3>All Orders</h3>
              <ul>
                {overviewData.orders.map((o) => (
                  <li key={o.id}>
                    Order #{o.id} - {o.status}
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteOrder(o.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case "projects":
        return <AddProjects />;
      case "products":
        return <AddProducts />;
      case "users":
        return <Users />;
      case "orders":
        return <Oders />;
      default:
        return <h2>Welcome to Admin Panel</h2>;
    }
  };

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2 className="h2">Admin</h2>
        <ul>
          <li onClick={() => setActiveSection("dashboard")}>Dashboard</li>
          <li onClick={() => setActiveSection("projects")}>Projects</li>
          <li onClick={() => setActiveSection("products")}>Products</li>
          <li onClick={() => setActiveSection("users")}>Users</li>
          <li onClick={() => setActiveSection("orders")}>Orders</li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h1 className="h1">Admin Panel</h1>
        </header>
        <section className="overview">{renderContent()}</section>
      </main>
    </div>
  );
};

export default AdminDashboard;








