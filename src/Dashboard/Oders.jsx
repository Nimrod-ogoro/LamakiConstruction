import React, { useEffect, useState } from "react";
import { fetchAPI } from "../api"; // ✅ import helper

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await fetchAPI("/api/orders"); // ✅ use helper
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  return (
    <div className="admin-container">
      <h2>🛒 Orders</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.user_name}</td>
                <td>{o.total}</td>
                <td>{o.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;




