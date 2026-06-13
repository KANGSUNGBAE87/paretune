import type { StorageAdapter } from "../StorageAdapter";

export const webStorageAdapter: StorageAdapter = {
  get<T>(key: string) {
    if (typeof localStorage === "undefined") return undefined;
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : undefined;
  },
  set<T>(key: string, value: T) {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key: string) {
    if (typeof localStorage === "undefined") return;
    localStorage.removeItem(key);
  },
};
