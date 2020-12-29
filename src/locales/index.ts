import i18n, { TOptions } from 'i18next';
import en from './en.json';
import ru from './ru.json';

void i18n.init({
  lng: 'en',
  debug: true,
  fallbackLng: 'en',
  resources: {
    en: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      translation: en
    },
    ru: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      translation: ru
    }
  }
});

export const t = (key: string, options?: TOptions): string => i18n.t(key, options);

export default i18n;
