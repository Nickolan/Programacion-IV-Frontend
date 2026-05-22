import { useState } from 'react';

/**
 * Hook para manejar LocalStorage sincronizado con el estado de React.
 * Ideal para guardar preferencias del usuario, tokens (con cuidado), o carritos de compras.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Pasamos una función al useState para que la lectura de localStorage
  // solo se ejecute en el montaje inicial, y no en cada render.
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error leyendo del localStorage', error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error guardando en localStorage', error);
    }
  };

  return [storedValue, setValue] as const;
}
