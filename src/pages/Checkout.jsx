import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useCart } from "../cart/useCart";
import { validate } from "../checkout/validate";
import Button from "../components/Button";
import "./Checkout.css";

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "address", label: "Delivery address", type: "text", autoComplete: "street-address" },
];

const initialValues = { name: "", phone: "", email: "", address: "" };
const initialTouched = { name: false, phone: false, email: false, address: false };

export default function Checkout() {
  const { state, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // в состоянии только то, что нельзя вычислить: ввод пользователя
  // и то, в какие поля он уже заходил
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState(initialTouched);
  // флаг нужен, чтобы после очистки корзины не сработал редирект в /cart
  const [isOrdered, setIsOrdered] = useState(false);

  // ошибки и «форма верна» вычисляем из values, отдельно их не храним
  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // пользователь ушёл из поля — теперь можно показывать ошибку
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid) {
      // показываем ошибки у всех полей сразу
      setTouched({ name: true, phone: true, email: true, address: true });
      return;
    }

    // номер заказа из текущего времени, сервер не нужен
    const orderNumber = Date.now().toString(36).toUpperCase();

    setIsOrdered(true);
    clearCart();
    navigate(`/order-success/${orderNumber}`, { replace: true });
  };

  // корзина пустая — отправляем в корзину (кроме момента сразу после оформления)
  if (state.items.length === 0) {
    return isOrdered ? null : <Navigate to="/cart" replace />;
  }

  return (
    <div className="container checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          {FIELDS.map(({ name, label, type, autoComplete }) => {
            // ошибку показываем, только если из поля уже уходили
            const error = touched[name] ? errors[name] : undefined;

            return (
              <div key={name} className="form-field">
                <label htmlFor={name}>{label}</label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  autoComplete={autoComplete}
                  value={values[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-field__input ${error ? "form-field__input--error" : ""}`}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${name}-error` : undefined}
                />
                {error && (
                  <p id={`${name}-error`} className="form-field__error">
                    {error}
                  </p>
                )}
              </div>
            );
          })}

          <Button type="submit" variant="primary" className="btn--full" disabled={!isValid}>
            Place order
          </Button>
        </form>

        <div className="checkout-summary">
          <h2>Your order</h2>
          <ul className="checkout-items">
            {state.items.map((item) => (
              <li key={item.id} className="checkout-item">
                <img src={item.thumbnail} alt={item.title} />
                <div className="checkout-item__info">
                  <p className="checkout-item__title">{item.title}</p>
                  <p className="checkout-item__meta">
                    {item.count} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="checkout-item__total">${(item.price * item.count).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="checkout-total">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}