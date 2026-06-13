import { en } from "./en";
import { ko } from "./ko";

export type Locale = "ko" | "en";

const dictionaries: Record<Locale, Record<string, string>> = { ko, en };

export function t(key: string, locale: Locale = "ko", params: Record<string, string | number> = {}) {
  const template = dictionaries[locale][key] ?? dictionaries.ko[key] ?? key;
  return Object.entries(params).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, String(value)), template);
}

export { ko, en };
