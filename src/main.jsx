import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router"; 
import { CartProvider } from "./context/CartContext"; // подключаем провайдер корзины
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <CartProvider> {/* оборачиваем, чтобы корзина была доступна везде */}
        <App />
      </CartProvider>
    </HashRouter>
  </StrictMode>
);