import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { useCart } from "../context/CartContext";
import Button from "../components/Button";
import "./Product.css";

// страница одного товара
export default function Product() {
  // достаем id из адреса страницы
  const { id } = useParams();
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  const { addToCart } = useCart();

  // загружаем один товар по его id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        // адрес: /products/{id}
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        
        // если сервер вернул 404 (товара нет)
        if (!res.ok) throw new Error("Товар не найден");
        
        const data = await res.json();
        setProduct(data);
        setActiveImage(data.images[0]); // ставим первую картинку
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]); // если id меняется, загружаем заново

  if (isLoading) return <div className="container" style={{ padding: "50px" }}>Загрузка...</div>;
  
  // если ошибка (товара нет) - показываем сообщение
  if (error) return (
    <div className="container" style={{ padding: "50px", textAlign: "center" }}>
      <h2>{error}</h2>
      <Link to="/">Вернуться в каталог</Link>
    </div>
  );

  return (
    <div className="container product-page">
      
      {/* левая часть - галерея */}
      <div className="product-images">
        <img className="product-main-image" src={activeImage} alt={product.title} />
        <div className="product-thumbnails">
          {product.images.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt="" 
              onClick={() => setActiveImage(img)} 
              className={activeImage === img ? "active" : ""}
            />
          ))}
        </div>
      </div>

      {/* правая часть - информация */}
      <div className="product-info">
        <h1>{product.title}</h1>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-desc">{product.description}</p>
        
        <Button variant="primary" onClick={() => addToCart(product)}>
          Добавить в корзину
        </Button>
      </div>
    </div>
  );
}