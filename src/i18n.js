import {createI18n} from 'vue-i18n';
import en from './locales/en.json';
import ar from './locales/ar.json';

const i18n = createI18n({
  locale: 'ar', // set default locale
  fallbackLocale: 'ar', // fallback locale
  messages :{
    en: en,
    ar: ar
  }
});

export default i18n;
