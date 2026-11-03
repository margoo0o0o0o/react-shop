// импортируем компоненты (шапка, меню, карточка)
import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import ProductCard from "./components/ProductCard";
// импортируем тестовые данные (товары и категории)
import { mockProducts, mockCategories } from "./data/mockProducts";
// стили
import "./App.css";
// главный компонент, собирает все вместе
export default function App() {
  return (
    <>
      {/* шапка, передаем 0 товаров (корзина пустая) */}
      <Header cartCount={0} />

      {/* меню категорий, передаем массив и активную вкладку */}
      <CategoryNav categories={mockCategories} active="Beauty" />

      {/* основная часть, контейнер центрирует по экрану */}
      <main className="container main">
        
        {/* заголовок, слово Beauty красим синим */}
        <h1 className="main__title">
          Grab the best deal on <span className="main__accent">Beauty</span>
        </h1>

        {/* сетка карточек */}
        <div className="grid">
          
          {/* цикл: берем каждый товар и делаем для него карточку */}
          {mockProducts.map((product) => (
            <ProductCard 
              key={product.id} // уникальный ключ для React
              product={product} // передаем данные товара
            />
          ))}
          
        </div>
        
      </main>
    </>
  );
}