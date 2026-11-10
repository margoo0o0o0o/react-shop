import { useState, useEffect } from "react";
import { useSearchParams } from "react-router"; 
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // достаем параметры из адреса
  const [searchParams, setSearchParams] = useSearchParams();
  
  // берем значения из адреса (если нет - по умолчанию)
  const searchQuery = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sort") || "default";

  // функции для смены фильтров (с replace: true, чтобы не засорять историю)
  const setCategory = (val) => {
    const newParams = new URLSearchParams(searchParams);
    if (val === "all") newParams.delete("category");
    else newParams.set("category", val);
    setSearchParams(newParams, { replace: true });
  };

  const setSortBy = (val) => {
    const newParams = new URLSearchParams(searchParams);
    if (val === "default") newParams.delete("sort");
    else newParams.set("sort", val);
    setSearchParams(newParams, { replace: true });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); 
        
        // загружаем товары
        const productsRes = await fetch("https://dummyjson.com/products?limit=100");
        if (!productsRes.ok) throw new Error("Server error");
        const productsData = await productsRes.json();
        setProducts(productsData.products); 

        // загружаем категории
        const categoriesRes = await fetch("https://dummyjson.com/products/category-list");
        if (!categoriesRes.ok) throw new Error("Categories error");
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData); 
        
      } catch (err) {
        console.error(err); 
        setError("Failed to load data. Please check your internet connection.");
      } finally {
        setIsLoading(false); 
      }
    };
    fetchData(); 
  }, []); 

  // фильтруем товары (поиск + категория)
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // сортируем
  if (sortBy === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") { 
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") { 
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <main className="container main">
      <h1 className="main__title">
        Grab the best deal on <span className="main__accent">Beauty</span>
      </h1>

      <div className="filters">
        <select className="filters__select" value={selectedCategory} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>

        <select className="filters__select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">By rating</option>
        </select>
      </div>

      <div className="grid">
        {isLoading && <p>Loading products...</p>}
        {error && <p className="error-message">{error}</p>}
        
        {/* Теперь мы не передаем onAddToCart, карточка сама возьмет dispatch из контекста */}
        {!isLoading && !error && filteredProducts.length > 0 &&
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        {!isLoading && !error && filteredProducts.length === 0 && (
          <p>Nothing found. Try changing your request.</p>
        )}
      </div>
    </main>
  );
}