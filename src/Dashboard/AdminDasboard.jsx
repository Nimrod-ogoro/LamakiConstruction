import React, { useState, useEffect } from "react";
import AddProjects from "./AddProjects";
import AddProducts from "./AddProducts";
import Users from "./Users";
import Oders from "./Oders";
import { fetchAPI } from "../api";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [overviewData, setOverviewData] = useState({
    projects: [],
    products: [],
    users: [],
    orders: [],
  });

  /* ---------- helper ---------- */
  const safe = (arr) => (Array.isArray(arr) ? arr : []);

  useEffect(() => {
    if (activeSection === "dashboard") fetchAllData();
  }, [activeSection]);

  const fetchAllData = async () => {
    try {
      const [projects, products, users, orders] = await Promise.all([
        fetchAPI("/api/projects").then((r) => r.json()),
        fetchAPI("/api/products").then((r) => r.json()),
        fetchAPI("/api/auth/users").then((r) => r.json()),
        fetchAPI("/api/orders").then((r) => r.json()),
      ]);
      setOverviewData({ projects, products, users, orders });
    } catch (error) {
      console.error("Error fetching overview data:", error);
    }
  };

  const handleDelete = async (type, endpoint, id) => {
    if (!window.confirm(`Delete this ${type.slice(0, -1)}?`)) return;
    try {
      await fetchAPI(`${endpoint}/${id}`, { method: "DELETE" });
      setOverviewData((prev) => ({
        ...prev,
        [type]: prev[type].filter((item) => item.id !== id),
      }));
    } catch (err) {
      console.error(`Error deleting ${type}:`, err);
    }
  };

  const renderContent = () => {
    if (activeSection !== "dashboard") {
      const components = {
        projects: <AddProjects />,
        products: <AddProducts />,
        users: <Users />,
        orders: <Oders />,
      };
      return components[activeSection];
    }

    const tables = ["projects", "products", "users", "orders"];
    return (
      <div>
        <h2>📊 Dashboard Overview</h2>
        <div className="overview-cards">
          {tables.map((key) => (
            <div className="card" key={key}>
              <h3>{key}</h3>
              <p>{overviewData[key].length}</p>
            </div>
          ))}
        </div>

        <div className="data-tables">
          {tables.map((table) => (
            <section key={table}>
              <h3>All {table}</h3>
              <ul>
                {safe(overviewData[table]).map((item) => (
                  <li key={item.id}>
                    {item.name ||
                      item.title ||
                      item.username ||
                      item.email ||
                      `Order #${item.id}`}
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(
                          table,
                          table === "users" ? "/api/auth/users" : `/api/${table}`,
                          item.id
                        )
                      }
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>Admin</h2>
        <ul>
          {["dashboard", "projects", "products", "users", "orders"].map((s) => (
            <li key={s} onClick={() => setActiveSection(s)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h1>Admin Panel</h1>
        </header>
        <section className="overview">{renderContent()}</section>
      </main>
    </div>
  );
};

export default AdminDashboard;








