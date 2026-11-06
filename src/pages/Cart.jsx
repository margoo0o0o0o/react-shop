import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import Button from "../components/Button";
import "./Cart.css";

// страница корзины
export default function Cart() {
  // берем из контекста корзину и функции
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // считаем итоговую сумму
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <div className="container cart-page">
      <h1>Корзина</h1>
      
      {/* если пусто, показываем сообщение и ссылку на главную */}
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Ваша корзина пуста</p>
          <Link to="/" className="btn btn--primary" style={{ textDecoration: "none", display: "inline-block", marginTop: "20px" }}>
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          
          {/* список товаров */}
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} />
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                {/* кнопки + и - */}
                <div className="cart-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.count}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                {/* сумма за этот товар */}
                <p className="cart-item-total">${(item.price * item.count).toFixed(2)}</p>
                {/* кнопка удаления */}
                <button className="cart-remove" onClick={() => removeFromCart(item.id)}>🗑</button>
              </div>
            ))}
          </div>

          {/* блок с итоговой суммой */}
          <div className="cart-summary">
            <h2>Итого</h2>
            <div className="cart-total">
              <span>Сумма заказа:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Button variant="primary" className="btn--full">Оформить заказ</Button>
          </div>
        </div>
      )}
    </div>
  );
}