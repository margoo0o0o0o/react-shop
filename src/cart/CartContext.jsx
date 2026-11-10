import { useReducer, useEffect } from "react";
import { cartReducer, initialState, loadCart } from "./cartReducer";
import { CartContext } from "./context";

export function CartProvider({ children }) {
  // передаем loadCart третьим аргументом для правильной инициализации
  const [state, dispatch] = useReducer(cartReducer, initialState, loadCart);

  // сохраняем при изменении
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  // обертки над dispatch для удобства
  const addItem = (product) => dispatch({ type: "ADD_ITEM", payload: product });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const changeQuantity = (id, delta) => dispatch({ type: "UPDATE_QUANTITY", payload: { id, delta } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalCartCount = state.items.reduce((sum, item) => sum + item.count, 0);

  return (
    <CartContext.Provider value={{ 
      state, 
      totalCartCount,
      addItem, 
      removeItem, 
      changeQuantity, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}