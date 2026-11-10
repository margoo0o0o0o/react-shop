import { useReducer, useEffect } from "react";
import { cartReducer, initialState } from "./cartReducer";
import { CartContext } from "./context"; // импортируем коробку из нового файла

// провайдер, который раздает данные
export function CartProvider({ children }) {
  // используем useReducer для управления состоянием
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // загрузка из localStorage при старте
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        // если в сохраненной корзине есть товары, добавляем их через dispatch
        if (parsed.items) {
          parsed.items.forEach(item => {
            dispatch({ type: "ADD_ITEM", payload: item });
          });
        }
      }
    } catch {
      // если ошибка, ничего не делаем
    }
  }, []);

  // сохранение в localStorage при каждом изменении корзины
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  // считаем общее количество товаров
  const totalCartCount = state.items.reduce((sum, item) => sum + item.count, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, totalCartCount }}>
      {children}
    </CartContext.Provider>
  );
}