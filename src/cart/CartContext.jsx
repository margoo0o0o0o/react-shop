import { useLocalStorage } from "../hooks/useLocalStorage";
import { cartReducer, initialState, isValidCart } from "./cartReducer";
import { CartContext } from "./context";

export function CartProvider({ children }) {
  // чтение и запись в localStorage делает хук, битые данные он отбрасывает
  const [state, setState] = useLocalStorage("cart", initialState, isValidCart);

  // тот же редьюсер, только вместо dispatch — setState с функцией
  const dispatch = (action) => setState((prev) => cartReducer(prev, action));

  const addItem = (product) => dispatch({ type: "ADD_ITEM", payload: product });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const changeQuantity = (id, delta) => dispatch({ type: "UPDATE_QUANTITY", payload: { id, delta } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalCartCount = state.items.reduce((sum, item) => sum + item.count, 0);

  return (
    <CartContext.Provider
      value={{ state, totalCartCount, addItem, removeItem, changeQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}