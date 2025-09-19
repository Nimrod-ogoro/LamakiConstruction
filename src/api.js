import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default axios.create({
  baseURL,
});

// src/config/api.js   (same folder as axios file)
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchAPI = (endpoint, options = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });