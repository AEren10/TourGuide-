import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '@/locales/en.json';
import tr from '@/locales/tr.json';

const LANGUAGE_KEY = '@app_language';

const resources = {
  en: { translation: en },
  tr: { translation: tr },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);

  if (!savedLanguage) {
    const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';
    savedLanguage = deviceLanguage === 'tr' ? 'tr' : 'en';
  }

  await i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
};

export const changeLanguage = async (language: string) => {
  await AsyncStorage.setItem(LANGUAGE_KEY, language);
  await i18n.changeLanguage(language);
};

initI18n();

export default i18n;
