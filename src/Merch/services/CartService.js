import axios from 'axios';
import { AuthModalContext } from "./authEvent"

const API_URL = 'https://lamaki-backend.vercel.app/api/cart';

let modalRef = null; // singleton
export function setModalRef(ref) { modalRef = ref; }

function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const api = axios.create({ baseURL: API_URL });

/* ---- auto-modal on 401/403 ---- */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      const msg = err.response.data?.message || "";
      if (msg.includes("jwt expired") || msg.includes("invalid token")) {
        modalRef?.open?.(); //  ✔️  open existing modal
        return Promise.reject(new Error("Session expired – please log in again"));
      }
    }
    return Promise.reject(err);
  }
);

/* ---- same signatures ---- */
export const getCart = () => api.get("/", { headers: authHeader() }).then((r) => r.data);
export const addToCart = (productId, qty = 1) =>
  api.post("/add", { product_id: productId, quantity: qty }, { headers: authHeader() }).then((r) => r.data);
export const updateQty = (cartId, qty) =>
  api.put(`/${cartId}`, { quantity: qty }, { headers: authHeader() }).then((r) => r.data);
export const removeFromCart = (cartId) =>
  api.delete(`/${cartId}`, { headers: authHeader() }).then((r) => r.data);

