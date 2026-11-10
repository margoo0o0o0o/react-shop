import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router"; // Подключаем HashRouter
import { CartProvider } from "./cart/CartContext"; // 
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </HashRouter>
  </StrictMode>
);