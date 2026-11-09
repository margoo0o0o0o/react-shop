import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/useCart"; 

export default function Home() {
  const [products, setProducts] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); 
        const productsRes = await fetch("https://dummyjson.com/products?limit=100");
        if (!productsRes.ok) throw new Error("Server error");
        const productsData = await productsRes.json();
        setProducts(productsData.products); 

        const categoriesRes = await fetch("https://dummyjson.com/products/category-list");
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

  let filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesCategory;
  });

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
        <select className="filters__select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
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
        
        {!isLoading && !error && filteredProducts.length > 0 &&
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}

        {!isLoading && !error && filteredProducts.length === 0 && (
          <p>Nothing found. Try changing your request.</p>
        )}
      </div>
    </main>
  );
}