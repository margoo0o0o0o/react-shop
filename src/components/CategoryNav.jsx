import "./CategoryNav.css";

// компонент навигация по категориям, 1 - массив со словами, 2 - строка с названием категории, 3 - функция для смены категории
export default function CategoryNav({ categories, active, onSelectCategory }) {
  return (
    // навигация, берем ширину и центрируем меню
    <nav className="container category-nav" aria-label="Категории">
      {categories.map((name) => ( // цикл map проходим по кажлму слову и называем нейм текущее
        <button // для каждого создаем кнопку
          key={name} // уникальный ключ
          onClick={() => onSelectCategory(name)} // при клике вызываем функцию и передаем туда имя категории
          // если совпадает нейм и актив, то кнопка серая -3, если нет то - 4 кнопка пустая серая
          className={`category-nav__item ${name === active ? "category-nav__item--active" : ""}`}
        >
          {/* Делаем первую букву заглавной для красоты */}
          {name.charAt(0).toUpperCase() + name.slice(1)} 
        </button>
      ))}
    </nav>
  );
}