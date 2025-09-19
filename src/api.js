// src/config/api.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL?.trim() || "http://localhost:5000/api";

/* ---------- axios instance (optional) ---------- */
export const api = axios.create({ baseURL });

/* ---------- fetch helper ---------- */
export const fetchAPI = (endpoint, options = {}, raw = false) => {
  const isFormData = options.body instanceof FormData;
  const headers = raw || isFormData
    ? options.headers || {}                 // let browser set Content-Type + boundary
    : { "Content-Type": "application/json", ...options.headers };

  return fetch(`${baseURL}${endpoint}`, { ...options, headers });
};