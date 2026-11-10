import { Link } from "react-router";
import { useCart } from "../cart/useCart"; // новый путь
import Button from "../components/Button";
import "./Cart.css";

export default function Cart() {
  // достаем state и dispatch из контекста
  const { state, dispatch } = useCart(); 
  
  // считаем сумму, проходя по state.items
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);

  // функция очистки корзины (по заданию)
  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <div className="container cart-page">
      <h1>Cart</h1>
      
      {state.items.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <Link to="/" className="btn btn--primary cart-empty__link">
            Go to catalog
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list">
            {/* выводим товары из state.items */}
            {state.items.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} />
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-controls">
                  {/* используем dispatch для изменения количества */}
                  <button onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, delta: -1 } })}>-</button>
                  <span>{item.count}</span>
                  <button onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, delta: 1 } })}>+</button>
                </div>
                <p className="cart-item-total">${(item.price * item.count).toFixed(2)}</p>
                {/* используем dispatch для удаления */}
                <button className="cart-remove" onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}>🗑</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Total</h2>
            <div className="cart-total">
              <span>Order amount:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            {/* добавили кнопку очистки корзины (по заданию) */}
            <Button variant="outline" className="btn--full" onClick={handleClearCart} style={{ marginBottom: "10px" }}>
              Clear Cart
            </Button>
            <Button variant="primary" className="btn--full">Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
}