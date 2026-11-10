import { useContext } from "react";
import { CartContext } from "./context"; // берем из нового файла

// хук для получения данных корзины
export function useCart() {
  return useContext(CartContext);
}