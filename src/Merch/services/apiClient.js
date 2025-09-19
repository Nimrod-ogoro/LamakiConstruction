// client/src/services/apiClient.js
const API_BASE = "http://localhost:5000";

export async function apiClient(url, options = {}) {
  const token = localStorage.getItem("token");
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const res = await fetch(API_BASE + url, options);

  // ---- detect expired / invalid token ----
  if (res.status === 401 || res.status === 403) {
    const text = await res.text();
    if (text.includes("jwt expired") || text.includes("invalid token")) {
      // ---- auto logout ----
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "/login"; //  ←  hard redirect
      return Promise.reject(new Error("Session expired – please log in again"));
    }
  }

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}