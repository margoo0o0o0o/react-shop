import { useState, useEffect } from "react";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const [productsRes, categoriesRes] = await Promise.all([
          fetch("https://dummyjson.com/products?limit=100", { signal }),
          fetch("https://dummyjson.com/products/category-list", { signal }),
        ]);
        if (!productsRes.ok || !categoriesRes.ok) throw new Error("Server error");

        const [productsData, categoriesData] = await Promise.all([
          productsRes.json(),
          categoriesRes.json(),
        ]);

        setProducts(productsData.products);
        setCategories(categoriesData);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError("Failed to load data. Please check your internet connection.");
      } finally {
        if (!signal.aborted) setIsLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return { products, categories, isLoading, error };
}
