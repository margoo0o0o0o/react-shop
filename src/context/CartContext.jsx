import { createContext, useState, useEffect, useContext } from "react";

// создаем коробку (контекст), в которой будут лежать данные
export const CartContext = createContext();

// компонент-обертка, который раздает данные всем страницам
export function CartProvider({ children }) {
  // корзина
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return []; 
    }
  });

  // состояние для поиска (теперь оно тоже здесь!)
  const [searchQuery, setSearchQuery] = useState("");

  // сохранение корзины
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...prevItems, { 
        id: product.id, 
        title: product.title, 
        price: product.price, 
        thumbnail: product.thumbnail, 
        count: 1 
      }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newCount = item.count + delta;
          if (newCount <= 0) return null; 
          return { ...item, count: newCount }; 
        }
        return item;
      }).filter(Boolean) 
    );
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.count, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateQuantity, totalCartCount,
      searchQuery, setSearchQuery // <--- передаем поиск
    }}>
      {children}
    </CartContext.Provider>
  );
}

// хук для удобного получения данных
export function useCart() {
  return useContext(CartContext);
}