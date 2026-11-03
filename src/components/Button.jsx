import "./Button.css"; // компонент кнопки
// 1- текст на кнопке, 2 - цвет кнопки по умочлчанию если не задать, 3 - доп. настройки, 4 - все оастльное 
export default function Button({ children, variant = "primary", className = "", ...props }) {
  return (
    // базовый стиль, подстановка вариант, класс нейм, пропс если еще что
    <button className={`btn btn--${variant} ${className}`} {...props}>
      {children} 
    </button>
  );
}
