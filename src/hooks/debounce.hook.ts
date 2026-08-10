import { useEffect, useState } from "react";

type UseDebounceProp = {
  value: string;
  delay?: number;
};
export function useDebounce({ value, delay = 500 }: UseDebounceProp) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(id);
  });
  return debounceValue;
}
