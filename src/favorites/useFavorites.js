import { useContext } from "react";
import { FavoritesContext } from "./context";

export function useFavorites() {
  return useContext(FavoritesContext);
}