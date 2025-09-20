// src/config/api.js
const baseURL = import.meta.env.VITE_API_URL?.trim() || "http://localhost:5000/api";

export const fetchAPI = (endpoint, options = {}, raw = false) => {
  const isFormData = options.body instanceof FormData;
  const headers = raw || isFormData
    ? options.headers || {}
    : { "Content-Type": "application/json", ...options.headers };

  return fetch(`${baseURL}${endpoint}`, { ...options, headers });
};

/* optional axios instance for legacy code */
import axios from "axios";
export const api = axios.create({ baseURL });
