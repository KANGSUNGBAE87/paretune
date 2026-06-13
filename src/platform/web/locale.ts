import type { Locale } from "../../i18n";
import type { LocaleAdapter } from "../LocaleAdapter";

let activeLocale: Locale = "ko";

export const webLocaleAdapter: LocaleAdapter = {
  getLocale() {
    return activeLocale;
  },
  setLocale(locale: Locale) {
    activeLocale = locale;
  },
};
