import { useLocalStorage } from "../hooks/useLocalStorage";
import { FavoritesContext } from "./context";

const initialState = { items: [] };

// проверка формы данных из localStorage
function isValidFavorites(data) {
  return (
    data !== null &&
    typeof data === "object" &&
    Array.isArray(data.items) &&
    data.items.every(
      (item) =>
        item &&
        typeof item.id === "number" &&
        typeof item.title === "string" &&
        typeof item.price === "number" &&
        typeof item.thumbnail === "string" &&
        typeof item.rating === "number" &&
        typeof item.discountPercentage === "number"
    )
  );
}

export function FavoritesProvider({ children }) {
  const [state, setState] = useLocalStorage("favorites", initialState, isValidFavorites);

  const toggleFavorite = (product) => {
    setState((prev) => {
      const alreadyAdded = prev.items.some((item) => item.id === product.id);
      if (alreadyAdded) {
        return { items: prev.items.filter((item) => item.id !== product.id) };
      }
      return {
        items: [
          ...prev.items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            rating: product.rating,
            discountPercentage: product.discountPercentage,
          },
        ],
      };
    });
  };

  const isFavorite = (id) => state.items.some((item) => item.id === id);
  const totalFavoritesCount = state.items.length;

  return (
    <FavoritesContext.Provider value={{ state, toggleFavorite, isFavorite, totalFavoritesCount }}>
      {children}
    </FavoritesContext.Provider>
  );
}