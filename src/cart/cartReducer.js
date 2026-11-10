// начальное состояние корзины
export const initialState = {
  items: [],
};

// функция для загрузки корзины из localStorage (исправляет баг StrictMode)
export function loadCart() {
  try {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch {
    // если ошибка, возвращаем пустое состояние
  }
  return initialState;
}

// редьюсер
export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, count: item.count + 1 } : item
          ),
        };
      }
      // Сохраняем только нужные поля
      const newItem = {
        id: action.payload.id,
        title: action.payload.title,
        price: action.payload.price,
        thumbnail: action.payload.thumbnail,
        count: 1,
      };
      return {
        ...state,
        items: [...state.items, newItem],
      };
    }
    
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case "UPDATE_QUANTITY": {
      return {
        ...state,
        items: state.items
          .map((item) => {
            if (item.id === action.payload.id) {
              const newCount = item.count + action.payload.delta;
              if (newCount <= 0) return null;
              return { ...item, count: newCount };
            }
            return item;
          })
          .filter(Boolean),
      };
    }

    case "CLEAR_CART": {
      return initialState;
    }

    default:
      return state;
  }
}