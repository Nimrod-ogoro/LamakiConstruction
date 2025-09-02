import React from "react";

const Orders = () => {
  const orders = [
    { id: 1, product: "Helmet", user: "John Doe", status: "Pending" },
    { id: 2, product: "Safety Vest", user: "Jane Smith", status: "Completed" },
  ];

  return (
    <div>
      <h2>Orders</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>User</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.product}</td>
              <td>{o.user}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;

