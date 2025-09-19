import { createContext, useContext } from "react";
export const AuthModalContext = createContext({ open: () => {}, close: () => {} });
export function useAuthModal() {
  return useContext(AuthModalContext);
}