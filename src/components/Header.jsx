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

  // берем поиск из адреса (финальное значение)
  const searchQuery = searchParams.get("q") || "";
  
  // локальное состояние для ввода (чтобы буквы появлялись сразу)
  const [inputValue, setInputValue] = useState(searchQuery);
  
  // дебаунсим ввод 
  const debouncedSearch = useDebounce(inputValue, 300);

  // когда debouncedSearch меняется, обновляем URL
  useEffect(() => {
    // если значение в адресе уже совпадает с тем, что мы ввели — ничего не делаем
    if (debouncedSearch === searchQuery) return;

    const newParams = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      newParams.set("q", debouncedSearch);
    } else {
      newParams.delete("q");
    }

    if (location.pathname !== "/") {
      navigate(`/?${newParams.toString()}`);
    } else {
      setSearchParams(newParams, { replace: true });
    }
    // Отключаем проверку зависимостей, чтобы избежать бесконечного цикла
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]); 

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
          onChange={(e) => setInputValue(e.target.value)} 
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