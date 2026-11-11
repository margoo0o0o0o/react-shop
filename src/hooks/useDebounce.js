import { useState, useEffect } from "react";

// хук для задержки значения (debounce)
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // запускаем таймер
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // если значение изменилось раньше, чем сработал таймер — очищаем его
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}