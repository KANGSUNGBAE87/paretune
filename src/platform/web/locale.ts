import { isLocale, setActiveLocale, type Locale } from "../../i18n";
import type { LocaleAdapter } from "../LocaleAdapter";

const storageKey = "couple-tendency:locale";
let activeLocale: Locale = "ko";

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return activeLocale;
  const stored = window.localStorage.getItem(storageKey);
  return isLocale(stored) ? stored : "ko";
}

export const webLocaleAdapter: LocaleAdapter = {
  getLocale() {
    activeLocale = readStoredLocale();
    setActiveLocale(activeLocale);
    return activeLocale;
  },
  setLocale(locale: Locale) {
    activeLocale = locale;
    setActiveLocale(locale);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, locale);
    }
  },
};
