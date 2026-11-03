const img = (name) => // функция принимает нейм, 
  `https://cdn.dummyjson.com/products/images/beauty/${encodeURIComponent(name)}/thumbnail.png`;
// массив товаров, все сами картинку из ссылки
export const mockProducts = [
  { id: 1, title: "Essence Mascara Lash Princess", price: 9.99, discountPercentage: 7.17, rating: 4.94, thumbnail: img("Essence Mascara Lash Princess") },
  { id: 2, title: "Eyeshadow Palette with Mirror", price: 19.99, discountPercentage: 5.5, rating: 3.28, thumbnail: img("Eyeshadow Palette with Mirror") },
  { id: 3, title: "Powder Canister", price: 14.99, discountPercentage: 18.14, rating: 3.82, thumbnail: img("Powder Canister") },
  // очень длинное название — проверка, что карточка не ломается
  { id: 4, title: "Red Lipstick with an Extremely Long Product Name That Must Not Break the Card Layout", price: 12.99, discountPercentage: 12.16, rating: 4.1, thumbnail: img("Red Lipstick") },
];

export const mockCategories = ["Groceries", "Beauty", "Fragrances", "Furniture", "Electronics"];
