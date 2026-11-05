import { useState, useEffect } from "react"; 
import "./ProductModal.css";
import Button from "./Button";

// компонент модального окна (подробности о товаре)
export default function ProductModal({ product, onClose, onAddToCart }) {
  // 1 - текущая картинка, которую видит пользователь, 2 - ф-ция для её смены
  const [activeImage, setActiveImage] = useState("");

  // Когда открывается новый товар, сбрасываем активную картинку на первую из массива
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      // отключаем проверку линтера для этой строчки
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveImage(product.images[0]);
    }
  }, [product]); // добавили product в зависимости

  // Слушатель на клавишу Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Если товара нет (окно закрыто), ничего не рисуем
  if (!product) return null;

  // Берем массив фото (если вдруг images пустой, берем хотя бы thumbnail)
  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    // Клик по темному фону (overlay) закрывает окно
    <div className="modal-overlay" onClick={onClose}>
      
      {/* stopPropagation нужен, чтобы клик внутри белого окна не закрывал его */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* кнопка-крестик для закрытия */}
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-body">
          
          {/* Левая часть - галерея */}
          <div className="modal-images-section">
            
            {/* Главная большая картинка */}
            <div className="modal-main-image">
              <img src={activeImage} alt={product.title} />
            </div>

            {/* Лента с превьюшками (показываем, только если фото больше одного) */}
            {images.length > 1 && (
              <div className="modal-thumbnails">
                {images.map((img, index) => (
                  <img 
                    key={index} 
                    src={img} 
                    alt={`${product.title} ${index}`} 
                    onClick={() => setActiveImage(img)} // при клике меняем главную
                    className={activeImage === img ? "active-thumbnail" : ""} // подсвечиваем выбранную
                  />
                ))}
              </div>
            )}
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