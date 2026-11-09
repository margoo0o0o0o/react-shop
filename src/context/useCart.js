import { useContext } from "react";
import { CartContext } from "./CartContext";

// хук для получения данных корзины
export function useCart() {
  return useContext(CartContext);
}