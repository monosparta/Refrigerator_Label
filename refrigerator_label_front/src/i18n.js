import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./Assets/i18n/en.json";
import tw from "./Assets/i18n/zh-TW.json";
import jp from "./Assets/i18n/jp.json";


const resources = {
  "zh-TW": {
    translation: tw,
  },
  en: {
    translation: en,
  },
  jp: {
    translation: jp,
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
