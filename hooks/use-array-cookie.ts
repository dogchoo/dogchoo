import Cookies from "js-cookie";
import { useState } from "react";

export const useArrayCookie = <T>(key: string, initialValue: T[] = []) => {
  const [value, setValue] = useState<T[]>(() => {
    try {
      const cookie = Cookies.get(key);

      return cookie ? JSON.parse(cookie) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const updateCookie = (newValue: T[]) => {
    setValue(newValue);
    Cookies.set(key, JSON.stringify(newValue));
  };

  const addItem = (item: T) => {
    const newValue = [...value, item];
    updateCookie(newValue);
  };

  const removeItem = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    updateCookie(newValue);
  };

  const updateItem = (index: number, item: T) => {
    const newValue = [...value];
    newValue[index] = item;
    updateCookie(newValue);
  };

  const clear = () => {
    updateCookie([]);
  };

  return {
    value,
    setValue: updateCookie,
    addItem,
    removeItem,
    updateItem,
    clear,
  };
};
