import { useState, useEffect } from "react";

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function load() {
      try {
        setProduct(null);
        setError(null);
        setIsLoading(true);

        const res = await fetch(`https://dummyjson.com/products/${id}`, { signal });
        if (!res.ok) throw new Error("Product not found");
        setProduct(await res.json());
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
      } finally {
        if (!signal.aborted) setIsLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [id]);

  return { product, isLoading, error };
}
