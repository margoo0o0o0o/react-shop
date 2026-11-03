import "./CategoryNav.css";
// компонент навигация по категориям, 1 - массив со словами, 2 - строка с названием категории
export default function CategoryNav({ categories, active }) {
  return (
    // навигация, берем ширину и центрируем меню
    <nav className="container category-nav" aria-label="Категории">
      {categories.map((name) => ( // цикл map проходим по кажлму слову и называем нейм текущее
        <button // для каждого создаем кнопку
          key={name} // уникальный ключ
          // если совпадает нейм и актив, то кнопк серая -3, если нет то - 4 кнопка пустая серая,
          className={`category-nav__item ${name === active ? "category-nav__item--active" : ""}`}
        >
          {name} 
        </button>
      ))}
    </nav>
  );
}
