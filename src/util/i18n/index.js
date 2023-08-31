import i18n from "i18n-js";
import english from "./en";

i18n.translations = {
  en: english,
};

// if we wanna set custom locales
// i18n.locale = "en";
i18n.fallbacks = true;

export default i18n;
