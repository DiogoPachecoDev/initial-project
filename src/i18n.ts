import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "pt",
    preload: ["en", "es", "pt"],
    backend: {
      loadPath: "./locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: ["header", "querystring", "cookie"],
      caches: ["cookie"],
    },
    debug: false,
  });

export const i18nMiddleware = middleware.handle(i18next);
export default i18next;