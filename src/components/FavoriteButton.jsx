import { useFavorites } from "../favorites/useFavorites";
import "./FavoriteButton.css";

export default function FavoriteButton({ product, withLabel = false }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(product.id);

  return (
    <button
      type="button"
      className={`btn-favorite ${active ? "is-active" : ""}`}
      onClick={() => toggleFavorite(product)}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
    >
      <span aria-hidden="true">{active ? "♥" : "♡"}</span>
      {withLabel && (
        <span className="btn-favorite__label">
          {active ? "In favorites" : "Add to favorites"}
        </span>
      )}
    </button>
  );
}