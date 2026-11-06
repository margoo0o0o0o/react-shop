import "./Header.css";
import { Link } from "react-router";

// компонент шапки, параметр - пропс, кол-во товаров в корзине 0 - по умолчанию
export default function Header({ cartCount = 0, searchQuery, onSearchChange }) {
  return (
    <header className="header"> {/* оборачиваем в тег */}
      <div className="container header__inner"> {/* класс ограничивает ширину и центрирует шапку */}
        
        {/* логотип-ссылка на главную (через Link, чтобы без перезагрузки) */}
        <Link to="/" className="header__logo">MegaMart</Link> 
        
        <input /* поле поиска */
          className="header__search"
          type="search"
          placeholder="Search essentials, groceries and more..."
          aria-label="Поиск товаров"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)} 
        />
        
        {/* ссылка на страницу корзины (вместо кнопки) */}
        <Link to="/cart" className="header__cart" aria-label={`Корзина, товаров: ${cartCount}`}>
          
          {/* svg иконка корзины (рисуется кодом, текущий цвет берет из CSS) */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
          </svg>

          Cart {/* текст рядом с иконкой */}
          
          {/* кружочек с цифрой (сколько товаров в корзине) */}
          <span className="header__badge">{cartCount}</span>
        </Link>
        
      </div>
    </header>
  );
}