// UseState - ф-ция для хранения данных, автоматические переписывается, UseEffect - ф-ция, для выполнения кода при загрузке страницы
import { useState, useEffect } from "react"; 
import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import ProductCard from "./components/ProductCard";
// достаем массив с названиями категорий
import { mockCategories } from "./data/mockProducts"; 
import "./App.css";

export default function App() {
  // состояние для товаров (изначально пустой массив), 1 - переменная, гле хрантся данные, 2 - ф-ция, которая меняет эту переменную
  const [products, setProducts] = useState([]); 
  // состояние для загрузки, 1 - переменная тру либо фолз для состояния загрузки, 2 - ф-2ия, изначально тру, потому что данные еще не пришли и загрузка
  const [isLoading, setIsLoading] = useState(true); 
  // состояние для ошибки, в 1 - хранится текст ошибки, 2 - ф-ция, изначально ошибки нет поэтому null
  const [error, setError] = useState(null); 

  // вызываем useEffect внутри код, который должен выполниться, когда компонент появится на экране
  useEffect(() => {
    // создаем функцию для запроса данных, async - ключевое слово, что внутри ф-ции операции которые требут времени
    const fetchProducts = async () => {
      try {
        setIsLoading(true); // включаем загрузку, текст Загрзука
        // делаем запрос на сервер (ждем ответ), responce - посылка с ответом 
        const response = await fetch("https://dummyjson.com/products?limit=100");
        
        // если сервер вернул ошибку
        if (!response.ok) {
          throw new Error("Ошибка сервера");
        }

        // превращаем ответ сервера в удобный объект JS с временем
        const data = await response.json();
        
        // сохраняем полученные 100 товаров в состояние products
        setProducts(data.products); 
        
      } catch (err) {
        // выводим реальную ошибку в консоль (чтобы VS Code не ругался и для отладки)
        console.error(err); 
        // показываем пользователю понятный текст
        setError("Не удалось загрузить товары. Проверьте интернет.");
      } finally {
        // finally сработает в любом случае (даже если была ошибка)
        // выключаем загрузку, чтобы скрыть текст "Загрузка..."
        setIsLoading(false); 
      }
    };

    fetchProducts(); // запускаем функцию
  }, []); // пустой массив [] для одного раза

  return (
    <>
      {/* Выводим шапку, передаем 0 товаров в корзине */}
      <Header cartCount={0} />  
      {/* выводим компонент меню категорий передаем его и активаная бьюти */}
      <CategoryNav categories={mockCategories} active="Beauty" /> 
      
      <main className="container main">
        <h1 className="main__title">
          Grab the best deal on <span className="main__accent">Beauty</span>
        </h1>
        {/* создаем сетку для карточек */}
        <div className="grid">
          {/* если isLoading = true, показываем текст загрузки */}
          {isLoading && <p>Загрузка товаров...</p>}
          
          {/* если есть ошибка, показываем ее красным цветом */}
          {error && <p style={{ color: "red" }}>{error}</p>}
          
          {/* если загрузка прошла (isLoading = false) и ошибки нет (!error) - рисуем карточки */}
          {!isLoading && !error &&
            /* проходим по массиву с 100 товарами*/
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </main>
    </>
  );
}