import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

const memoryStorage = (() => {
  const items = new Map<string, string>();
  return {
    clear: () => items.clear(),
    getItem: (key: string) => items.get(key) ?? null,
    key: (index: number) => Array.from(items.keys())[index] ?? null,
    removeItem: (key: string) => {
      items.delete(key);
    },
    setItem: (key: string, value: string) => {
      items.set(key, String(value));
    },
    get length() {
      return items.size;
    },
  };
})();

Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: memoryStorage,
});

Object.defineProperty(window, "localStorage", {
  configurable: true,
  value: memoryStorage,
});

afterEach(() => {
  cleanup();
});
