import { en } from "./en";
import { ko } from "./ko";

export const localeOptions = [
  { id: "ko", label: "한국어" },
  { id: "en", label: "English" },
] as const;

export type Locale = (typeof localeOptions)[number]["id"];

const dictionaries: Record<Locale, Record<string, string>> = { ko, en };
let activeLocale: Locale = "ko";

export function isLocale(value: string | null | undefined): value is Locale {
  return localeOptions.some((option) => option.id === value);
}

export function getActiveLocale() {
  return activeLocale;
}

export function setActiveLocale(locale: Locale) {
  activeLocale = locale;
}

type Params = Record<string, string | number>;

export function t(key: string, localeOrParams: Locale | Params = activeLocale, params: Params = {}) {
  const locale = typeof localeOrParams === "string" ? localeOrParams : activeLocale;
  const values = typeof localeOrParams === "string" ? params : localeOrParams;
  const template = dictionaries[locale][key] ?? dictionaries.ko[key] ?? key;
  return Object.entries(values).reduce((text, [name, value]) => text.replaceAll("{" + name + "}", String(value)), template);
}

export { ko, en };
