// services/orderService.js

// Helper to get JWT token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create a new order
export const createOrder = async (order) => {
  const res = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(order),
  });
  if (!res.ok) {
    const errMsg = await res.text();
    throw new Error(`Order creation failed: ${errMsg}`);
  }
  return await res.json();
};

// Get all orders for the logged-in user
export const getOrders = async () => {
  const res = await fetch("http://localhost:5000/api/orders", {
    headers: getAuthHeader(),
  });
  if (!res.ok) {
    const errMsg = await res.text();
    throw new Error(`Failed to fetch orders: ${errMsg}`);
  }
  return await res.json();
};

// Get a specific order by ID (only if it belongs to the user)
export const getOrderById = async (id) => {
  const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
    headers: getAuthHeader(),
  });
  if (!res.ok) {
    const errMsg = await res.text();
    throw new Error(`Failed to fetch order: ${errMsg}`);
  }
  return await res.json();
};

// Update an order (like status or payment info)
export const updateOrder = async (id, updatedFields) => {
  const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(updatedFields),
  });
  if (!res.ok) {
    const errMsg = await res.text();
    throw new Error(`Failed to update order: ${errMsg}`);
  }
  return await res.json();
};

// Delete an order
export const deleteOrder = async (id) => {
  const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });
  if (!res.ok) {
    const errMsg = await res.text();
    throw new Error(`Failed to delete order: ${errMsg}`);
  }
  return await res.json();
};
