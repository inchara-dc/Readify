import { useState, useEffect } from 'react';

/**
 * UNIT V – Custom Hook: useLocalStorage
 * Synchronizes React component state with the browser's LocalStorage.
 * Handles JSON serialization, deserialization, lazy state initialization,
 * and graceful fallback in case storage is unavailable.
 *
 * @param {string} key - LocalStorage key identifier
 * @param {any} initialValue - Fallback initial value if key does not exist
 * @returns {[any, Function]} - [storedValue, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // Lazy state initialization to read from LocalStorage only once on mount
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Synchronize state changes to LocalStorage via useEffect
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
