import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if backend runs on different host/port
});

export default api;
