import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { useCart } from "./context/useCart"; 
import "./App.css";

export default function App() {
  const { totalCartCount } = useCart();

  return (
    <>
      <Header cartCount={totalCartCount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}