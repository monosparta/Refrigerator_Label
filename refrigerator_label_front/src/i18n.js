import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./Assets/i18n/en.json";
import tw from "./Assets/i18n/zh-TW.json";
import th from "./Assets/i18n/th.json";
import Lt from "./Assets/i18n/Lt-uz-UZ.json";

const resources = {
  en: {
    translation: en,
  },
  "zh-TW": {
    translation: tw,
  },
  th: {
    translation: th,
  },
  "Lt-uz-UZ": {
    translation: Lt,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "zh-TW",
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
