import { useState, useEffect } from "react";
import { CartContext } from "./context"; // импортируем коробку

// компонент-обертка, который раздает данные корзины всем страницам
export function CartProvider({ children }) {
  // корзина, 1 - массив товаров, 2 - ф-ция для его изменения. Пытаемся достать из localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return []; // если строка битая, возвращаем пустой массив
    }
  });

  // каждый раз, когда корзина меняется, сохраняем её в память браузера
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ф-ция добавления товара в корзину
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      }
      // сохраняем только нужные поля
      return [...prevItems, { id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail, count: 1 }];
    });
  };

  // ф-ция удаления товара
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // ф-ция изменения количества (+1 или -1)
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

  // считаем общее количество товаров
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.count, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalCartCount }}>
      {children}
    </CartContext.Provider>
  );
}