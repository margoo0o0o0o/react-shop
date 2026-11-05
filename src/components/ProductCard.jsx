import Button from "./Button";
import "./ProductCard.css";

// компонент карточки товара, 1 - product (объект с данными), 2 - onAddToCart (добавление в корзину), 3 - onCardClick (открытие модалки)
export default function ProductCard({ product, onAddToCart, onCardClick }) {
  
  // достаем нужные поля из объекта товара (деструктуризация)
  const { title, price, discountPercentage, rating, thumbnail } = product;

  // вычисляем старую цену до скидки по формуле
  const oldPrice = price / (1 - discountPercentage / 100);
  
  // сумма экономии (сколько денег сэкономит покупатель)
  const save = oldPrice - price;

  return (
    // карточка товара (семантический тег). onClick открывает модалку (стиль курсора теперь в CSS)
    <article className="card" onClick={() => onCardClick(product)}>
      
      <div className="card__media">
        <img className="card__image" src={thumbnail} alt={title} loading="lazy" />
        
        {/* показываем бейдж только если округленная скидка больше 0 */}
        {Math.round(discountPercentage) > 0 && (
          <span className="card__badge">{Math.round(discountPercentage)}% OFF</span> 
        )}
      </div>

      <div className="card__body"> {/* блок с текстом и кнопкой */}
        
        <h2 className="card__title">{title}</h2> 
        {/* название товара (обрезается до 2 строк через CSS) */}
        
        <p className="card__rating">★ {rating.toFixed(1)}</p> 
        {/* рейтинг: toFixed(1) оставляет один знак после запятой (например, 4.9) */}

        <p className="card__prices">
          <span className="card__price">${price.toFixed(2)}</span> 
          {/* текущая цена (с двумя знаками после запятой) */}
          
          <s className="card__old-price">${oldPrice.toFixed(2)}</s> 
          {/* старая цена: тег <s> делает текст зачеркнутым */}
        </p>
        
        <p className="card__save">Save - ${save.toFixed(2)}</p> 
        {/* текст "сколько сэкономили" (зеленым цветом) */}

        <div className="card__action"> {/* блок для кнопки (прижат к низу через CSS) */}
          
          {/* обертка для кнопки с stopPropagation, чтобы клик по кнопке не открывал модалку */}
          <div onClick={(e) => e.stopPropagation()}>
            
            {/* наша переиспользуемая кнопка, при клике вызываем функцию добавления */}
            <Button variant="outline" className="btn--full" onClick={() => onAddToCart(product)}>
              В корзину
            </Button> 
            
          </div>
        </div>
        
      </div>
    </article>
  );
}