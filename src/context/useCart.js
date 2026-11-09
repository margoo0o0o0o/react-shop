import { useContext } from "react";
import { CartContext } from "./context"; // импортируем коробку из нового файла

// хук для получения данных корзины
export function useCart() {
  return useContext(CartContext);
}