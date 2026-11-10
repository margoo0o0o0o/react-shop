import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { useCart } from "../cart/useCart"; 
import Button from "../components/Button";
import "./Product.css";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  // достаем готовую функцию добавления
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
        
        if (data.images && data.images.length > 0) {
          setActiveImage(data.images[0]);
        } else {
          setActiveImage(data.thumbnail);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) return <div className="container product-message">Loading...</div>;
  
  if (error) return (
    <div className="container product-message">
      <h2>{error}</h2>
      <Link to="/" className="btn btn--primary">Back to catalog</Link>
    </div>
  );

  return (
    <div className="container product-page">
      <div className="product-images">
        <img className="product-main-image" src={activeImage} alt={product.title} />
        
        {product.images && product.images.length > 1 && (
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
        )}
      </div>

      <div className="product-info">
        <h1>{product.title}</h1>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-desc">{product.description}</p>
        
        <Button 
          variant="primary" 
          onClick={() => addItem(product)}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}