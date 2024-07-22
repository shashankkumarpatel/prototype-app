import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  preload: ['en'],
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  partialBundledLanguages: true,
  react: {
    useSuspense: false,
  },
});

export default i18next;
