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
  // состояние для поиска,  в 1 - хранится текст, введеный в поиск, 2 - ф-ция для смены знаеничя переменной
  const [searchQuery, setSearchQuery] = useState("");
  // выбранной категории, в 1 - пермееная для хранения выбранной категории, в 2 - ф-ция, которая меняет значение, изначально all все категории
  const [selectedCategory, setSelectedCategory] = useState("all");
  // для сортировки, в 1 - .., в 2 - ф-2ия для смены способа сортировки, изначальное значение по умолчанию
  const [sortBy, setSortBy] = useState("default");

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

  
  // фильтруем товары (поиск + категория)
  // переменная для товаров, которык прошли проверку, функция фильтра и начало цикла
  let filteredProducts = products.filter((product) => {
    // = название товара, toLowerCase() длч перевода в нижний регистр, includes - метод для проверки есть ли внутри то, что ввели в поиск
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
     // если все категории то пропускаем все или если выбрана конктретная категория , то проверка совпадает ли с категорией товара
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    // оставляем товар если он подошел по поиску и по категории
    return matchesSearch && matchesCategory;
  });

  // 2. Сортируем
  // если сначала дешевле
  if (sortBy === "price-asc") {
    // берем два товара, если результат отрицательный, то сначала а.ю потом б
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") { // наоборот
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") { // по рейтингу
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <>
      {/* Выводим шапку, передаем 0 товаров в корзине, и данные для поиска */}
      <Header 
        cartCount={0}
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
      />  
      
      {/* выводим компонент меню категорий, передаем активную категорию и функцию для смены */}
      <CategoryNav 
        categories={mockCategories} 
        active={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      /> 
      
      <main className="container main">
        <h1 className="main__title">
          Grab the best deal on <span className="main__accent">Beauty</span>
        </h1>

        {/* блок с фильтрами (категории и сортировка) */}
        <div className="filters">
          <select  // выпадающий список
            className="filters__select"
            value={selectedCategory}  // все категории либо смененный
            onChange={(e) => setSelectedCategory(e.target.value)} // событие если нажимаем на другой пункт
          >
            <option value="all">Все категории</option>
            {mockCategories.map(cat => ( // массив, cat - текущее значение
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)} {/* Делаем первую букву заглавной */}
              </option>
            ))}
          </select>

          <select  // сортировка
            className="filters__select"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">По умолчанию</option>
            <option value="price-asc">Сначала дешевле</option>
            <option value="price-desc">Сначала дороже</option>
            <option value="rating">По рейтингу</option>
          </select>
        </div>

        {/* создаем сетку для карточек */}
        <div className="grid">
          {/* если isLoading = true, показываем текст загрузки */}
          {isLoading && <p>Загрузка товаров...</p>}
          
          {/* если есть ошибка, показываем ее красным цветом */}
          {error && <p style={{ color: "red" }}>{error}</p>}
          
          {/* если загрузка прошла и ошибки нет - рисуем отфильтрованные карточки */}
          {!isLoading && !error && filteredProducts.length > 0 &&
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

          {/* если ничего не найдено - показываем сообщение */}
          {!isLoading && !error && filteredProducts.length === 0 && (
            <p>Ничего не найдено. Попробуйте изменить запрос.</p>
          )}
        </div>
      </main>
    </>
  );
}