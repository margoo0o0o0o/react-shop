import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router"; 
import { CartProvider } from "./cart/CartContext"; 
import { FavoritesProvider } from "./favorites/FavoritesContext"; 
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <CartProvider>
        <FavoritesProvider> 
          <App />
        </FavoritesProvider>
      </CartProvider>
    </HashRouter>
  </StrictMode>
);