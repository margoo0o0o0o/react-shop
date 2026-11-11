import "./Header.css";
import { useState, useEffect } from "react";
import { Link, useSearchParams, useLocation, useNavigate } from "react-router";
import { useCart } from "../cart/useCart";
import { useDebounce } from "../hooks/useDebounce";

export default function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { totalCartCount } = useCart();

  const searchQuery = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(searchQuery);
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

  // адрес изменился не из поля (логотип, кнопка «Назад») — обновляем текст в поле
  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery);
    setInputValue(searchQuery);
  }

  const updateUrl = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("q", value);
    } else {
      newParams.delete("q");
    }

    if (location.pathname !== "/") {
      navigate(`/?${newParams.toString()}`);
    } else {
      setSearchParams(newParams, { replace: true });
    }
  };

  const { debounced: debouncedUpdateUrl, cancel } = useDebounce(updateUrl, 300);

  // адрес поменялся — отложенное обновление со старым текстом уже не нужно
  useEffect(() => cancel, [searchQuery, cancel]);

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
    debouncedUpdateUrl(e.target.value);
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">MegaMart</Link>

        <input
          className="header__search"
          type="search"
          placeholder="Search essentials, groceries and more..."
          aria-label="Search products"
          value={inputValue}
          onChange={handleSearchChange}
        />

        <Link to="/cart" className="header__cart" aria-label={`Cart, items: ${totalCartCount}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
          </svg>
          Cart
          <span className="header__badge">{totalCartCount}</span>
        </Link>
      </div>
    </header>
  );
}