import Button from "./Button";
import "./ProductCard.css";

// компонент карточки товара, пропс product - это объект с данными одного товара, onAddToCart - функция добавления в корзину
export default function ProductCard({ product, onAddToCart }) {
  
  // достаем нужные поля из объекта товара (деструктуризация)
  const { title, price, discountPercentage, rating, thumbnail } = product;

  // вычисляем старую цену до скидки по формуле
  const oldPrice = price / (1 - discountPercentage / 100);
  
  // сумма экономии (сколько денег сэкономит покупатель)
  const save = oldPrice - price;

  return (
    <article className="card"> {/* карточка товара (семантический тег) */}
      
      <div className="card__media"> {/* блок для фото и бейджа скидки */}
        
        <img className="card__image" src={thumbnail} alt={title} loading="lazy" /> 
        {/* картинка товара: src - ссылка, alt - текст если фото не загрузится, loading="lazy" - загрузка только при прокрутке */}
        
        <span className="card__badge">{Math.round(discountPercentage)}% OFF</span> 
        {/* синий бейджик в углу: Math.round округляет процент скидки до целого */}
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
          
          {/* наша переиспользуемая кнопка, при клике вызываем функцию и передаем товар */}
          <Button variant="outline" className="btn--full" onClick={() => onAddToCart(product)}>
            В корзину
          </Button> 
          
        </div>
        
      </div>
    </article>
  );
}