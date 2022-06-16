import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  ee: {
    translation: {
      "Welcome to React": "Tere tulemast Reacti ja react-i18nexti",
      "navbar.admin-button": "Admin vaatesse",
      "navbar.shops-button": "Poed",
      "navbar.cart-button": "Ostukorv",
    }
  },
  ru: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next",
      "navbar.admin-button": "Admin vaatesse RU",
      "navbar.shops-button": "Poed RU",
      "navbar.cart-button": "Ostukorv RU",
    }
  }, 
  uk: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
      "navbar.admin-button": "To admin view",
      "navbar.shops-button": "Shops",
      "navbar.cart-button": "Cart",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("language") || "ee", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;