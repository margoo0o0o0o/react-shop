import "./Cart.css";
import Button from "./Button"; 

export default function Cart({ isOpen, onClose, items, onRemove, onUpdateQuantity }) {
  // считаем итоговую сумму, проходим по массиву и умножаем цену на количество
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.count, 0);

  // если корзина закрыта (isOpen = false), ничего не рисуем
  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}> {/* темный фон, при клике закрывает корзину */}
      
      {/* сама панель, stopPropagation нужен, чтобы клик внутри не закрывал корзину */}
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        
        <div className="cart-header"> {/* шапка корзины */}
          <h2>Корзина</h2>
          <button className="cart-close" onClick={onClose}>×</button> {/* крестик для закрытия */}
        </div>

        {/* если товаров нет, пишем что пусто, если есть - выводим список */}
        {items.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <div className="cart-items">
            {items.map((item) => ( // цикл по товарам в корзине
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} />
                
                <div className="cart-item-info">
                  <h4>{item.title}</h4>
                  <p>${item.price.toFixed(2)}</p>
                  
                  <div className="cart-controls"> {/* кнопки + и - для количества */}
                    <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                    <span>{item.count}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>

                {/* кнопка удаления товара (корзинка) */}
                <button className="cart-remove" onClick={() => onRemove(item.id)}>🗑</button>
              </div>
            ))}
          </div>
        )}

        {/* блок с итоговой суммой и кнопкой заказа, показываем только если есть товары */}
        {items.length > 0 && (
          <div className="cart-footer">
            <h3>Итого: ${totalPrice.toFixed(2)}</h3>
            <Button variant="primary" className="btn--full">Оформить заказ</Button>
          </div>
        )}
      </div>
    </div>
  );
}