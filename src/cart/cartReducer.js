// начальное состояние корзины
export const initialState = {
  items: [], // тут храним товары
};

// редьюсер — ф-ция, которая меняет состояние в зависимости от команды (action)
export function cartReducer(state, action) {
  switch (action.type) {
    // добавить товар
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // если товар уже есть, увеличиваем количество на 1
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, count: item.count + 1 } : item
          ),
        };
      }
      // если нет, добавляем новый с count: 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, count: 1 }],
      };
    }
    
    // удалить товар
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    // изменить количество (+1 или -1)
    case "UPDATE_QUANTITY": {
      return {
        ...state,
        items: state.items
          .map((item) => {
            if (item.id === action.payload.id) {
              const newCount = item.count + action.payload.delta;
              if (newCount <= 0) return null; // если 0 или меньше, удаляем
              return { ...item, count: newCount };
            }
            return item;
          })
          .filter(Boolean), // убираем null
      };
    }

    // очистить всю корзину
    case "CLEAR_CART": {
      return initialState;
    }

    // если команда неизвестна, оставляем как было
    default:
      return state;
  }
}