import React, { useState, useEffect } from "react";
import AddProjectForm from "./AddProjects";
import AddProductForm from "./AddProducts";

const AdminPanel = () => {
  const [projects, setProjects] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  // ✅ Fetch Data
  useEffect(() => {
    fetchProjects();
    fetchProducts();
    fetchUsers();
    fetchOrders();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch("http://localhost:5000/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/api/orders");
    const data = await res.json();
    setOrders(data);
  };

  // ✅ Delete handlers
  const deleteProject = async (id) => {
    await fetch(`http://localhost:5000/api/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className="admin-panel">
      {/* Projects */}
      <section>
        <h2>Projects</h2>
        <table>
          <thead>
            <tr><th>Title</th><th>Description</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.description}</td>
                <td>
                  <button className="dash_btn" onClick={() => deleteProject(p.id)}>Delete</button>
                  <button>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="dash_btn" onClick={() => setShowProjectForm(true)}>Add Project</button>
        {showProjectForm && <AddProjectForm onClose={() => {setShowProjectForm(false); fetchProjects();}} />}
      </section>

      {/* Products */}
      <section>
        <h2>Products</h2>
        <table>
          <thead>
            <tr><th>Name</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button className="dash_btn" onClick={() => deleteProduct(p.id)}>Delete</button>
                  <button>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button  className="dash_btn" onClick={() => setShowProductForm(true)}>Add Product</button>
        {showProductForm && <AddProductForm onClose={() => {setShowProductForm(false); fetchProducts();}} />}
      </section>

      {/* Users */}
      <section>
        <h2>Users</h2>
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Orders */}
      <section>
        <h2>Orders</h2>
        <table>
          <thead>
            <tr><th>Order ID</th><th>User</th><th>Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.user_name}</td>
                <td>{o.total}</td>
                <td>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminPanel;
