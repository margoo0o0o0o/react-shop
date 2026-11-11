import { useRef, useEffect, useCallback } from "react";

export function useDebounce(callback, delay = 300) {
  const timerRef = useRef(null);
  const callbackRef = useRef(callback);

  // запоминаем самую свежую версию функции
  useEffect(() => {
    callbackRef.current = callback;
  });

  const cancel = useCallback(() => {
    clearTimeout(timerRef.current);
  }, []);

  const debounced = useCallback(
    (...args) => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );

  // при уходе со страницы снимаем таймер
  useEffect(() => cancel, [cancel]);

  return { debounced, cancel };
}
