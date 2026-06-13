import type { Locale } from "../i18n";

export type LocaleAdapter = {
  getLocale(): Locale;
  setLocale(locale: Locale): void;
};
