import { Link } from "react-router";
import { useFavorites } from "../favorites/useFavorites";
import ProductCard from "../components/ProductCard";
import "./Favorites.css"; // Не забудь создать и добавить стили

export default function Favorites() {
  const { state } = useFavorites();

  return (
    <div className="container favorites-page">
      <h1>Favorites</h1>

      {state.items.length === 0 ? (
        <div className="favorites-empty">
          <p>Your favorites list is empty</p>
          <Link to="/" className="btn btn--primary">Go to catalog</Link>
        </div>
      ) : (
        <div className="grid">
          {state.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}