import { useState } from "react";
import { useParams, Link } from "react-router";
import { useCart } from "../cart/useCart";
import { useProduct } from "../hooks/useProduct";
import Button from "../components/Button";
import FavoriteButton from "../components/FavoriteButton";
import "./Product.css";

export default function Product() {
  const { id } = useParams();
  const { product, isLoading, error } = useProduct(id);
  const [activeImage, setActiveImage] = useState("");
  const { addItem } = useCart();

  if (isLoading) return <div className="container product-message">Loading...</div>;

  if (error) return (
    <div className="container product-message">
      <h2>{error}</h2>
      <Link to="/" className="btn btn--primary">Back to catalog</Link>
    </div>
  );

  if (!product) return null;

  const mainImage = product.images?.includes(activeImage) ? activeImage : product.thumbnail;

  return (
    <div className="container product-page">
      <div className="product-images">
        <img className="product-main-image" src={mainImage} alt={product.title} />

        {product.images && product.images.length > 1 && (
          <div className="product-thumbnails">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setActiveImage(img)}
                className={mainImage === img ? "active" : ""}
              />
            ))}
          </div>
        )}
      </div>

      <div className="product-info">
        <h1>{product.title}</h1>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-desc">{product.description}</p>

        <div className="product-actions">
          <Button variant="primary" onClick={() => addItem(product)}>
            Add to cart
          </Button>
          <FavoriteButton product={product} withLabel />
        </div>
      </div>
    </div>
  );
}