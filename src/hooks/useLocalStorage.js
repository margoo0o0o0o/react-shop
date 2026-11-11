import { useState, useEffect } from "react";

// isValid — необязательная проверка формы данных:
// JSON может быть корректным, но не тем, что мы ждём
export function useLocalStorage(key, initialValue, isValid = () => true) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return initialValue;
      const parsed = JSON.parse(item);
      return isValid(parsed) ? parsed : initialValue;
    } catch {
      return initialValue; // битый JSON или localStorage недоступен
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // переполнение или запрет записи — приложение продолжает работать
    }
  }, [key, value]);

  return [value, setValue];
}