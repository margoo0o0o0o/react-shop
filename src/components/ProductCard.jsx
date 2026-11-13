import { Link } from "react-router";
import Button from "./Button";
import FavoriteButton from "./FavoriteButton";
import { useCart } from "../cart/useCart";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const { title, price, discountPercentage, rating, thumbnail, id } = product;
  const oldPrice = price / (1 - discountPercentage / 100);
  const save = oldPrice - price;

  return (
    <article className="card">
      <Link to={`/product/${id}`} className="card__link">
        <div className="card__media">
          <img className="card__image" src={thumbnail} alt={title} loading="lazy" />
          {Math.round(discountPercentage) > 0 && (
            <span className="card__badge">{Math.round(discountPercentage)}% OFF</span>
          )}
        </div>
        <div className="card__body">
          <h2 className="card__title">{title}</h2>
          <p className="card__rating">★ {rating.toFixed(1)}</p>
          <p className="card__prices">
            <span className="card__price">${price.toFixed(2)}</span>
            <s className="card__old-price">${oldPrice.toFixed(2)}</s>
          </p>
          <p className="card__save">Save - ${save.toFixed(2)}</p>
        </div>
      </Link>

      <div className="card__action">
        <div className="card__buttons">
          <Button variant="outline" className="btn--full" onClick={() => addItem(product)}>
            Add to cart
          </Button>
          <FavoriteButton product={product} />
        </div>
      </div>
    </article>
  );
}