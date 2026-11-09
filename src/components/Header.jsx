import "./Header.css";
import { Link, useSearchParams, useLocation, useNavigate } from "react-router";

export default function Header({ cartCount = 0 }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const searchQuery = searchParams.get("q") || "";

  const handleSearchChange = (e) => {
    const value = e.target.value;
    // создаем новый объект
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set("q", value);
    } else {
      newParams.delete("q");
    }

    // перекидываем в каталог
    if (location.pathname !== "/") {
      navigate(`/?${newParams.toString()}`);
    } else {
      // replace: true чтобы каждая буква не создавала новую запись в истории
      setSearchParams(newParams, { replace: true });
    }
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
          value={searchQuery}
          onChange={handleSearchChange}
        />
        
        <Link to="/cart" className="header__cart" aria-label={`Cart, items: ${cartCount}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
          </svg>
          Cart
          <span className="header__badge">{cartCount}</span>
        </Link>
      </div>
    </header>
  );
}