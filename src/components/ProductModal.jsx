import { useEffect } from "react"; // подключаем хук для прослушивания клавиатуры
import "./ProductModal.css";
import Button from "./Button";

// компонент модального окна (подробности о товаре), 1 - товар, 2 - ф-ция закрытия, 3 - ф-ция добавления в корзину
export default function ProductModal({ product, onClose, onAddToCart }) {
  
  // Добавляем слушатель на клавишу Esc, чтобы закрывать окно (хуки всегда должны быть вверху!)
  useEffect(() => {
    // ф-ция которая сработает при нажатии на клавишу
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose(); // если нажали Esc - закрываем
    };
    // вешаем слушатель на все окно
    window.addEventListener("keydown", handleKeyDown);

    // Очищаем слушатель, когда окно закрывается (чтобы не было утечек памяти)
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]); // следим за ф-цией закрытия

  // ТОЛЬКО ПОСЛЕ ХУКОВ: Если товара нет (окно закрыто), ничего не рисуем
  if (!product) return null;

  return (
    // Клик по темному фону (overlay) закрывает окно
    <div className="modal-overlay" onClick={onClose}>
      
      {/* stopPropagation нужен, чтобы клик внутри белого окна не закрывал его */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* кнопка-крестик для закрытия */}
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-body">
          {/* Левая часть - картинка товара */}
          <div className="modal-image">
            <img src={product.thumbnail} alt={product.title} />
          </div>

          {/* Правая часть - текст и кнопка */}
          <div className="modal-info">
            <h2>{product.title}</h2> {/* название */}
            <p className="modal-price">${product.price.toFixed(2)}</p> {/* цена */}
            <p className="modal-desc">{product.description}</p> {/* описание */}
            
            {/* кнопка добавления в корзину */}
            <Button 
              variant="primary" 
              className="btn--full"
              onClick={() => {
                onAddToCart(product); // добавляем товар
                onClose(); // Закрываем окно после добавления
              }}
            >
              В корзину
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}