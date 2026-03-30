import { useLocale } from './useLocale';

import en from '@/translates/en.json';
import uk from '@/translates/uk.json';

const messages = { en, uk };

export const useTranslates = () => {
  const { locale } = useLocale();

  const interpolate = (template, params = {}) => {
    if (!template || typeof template !== 'string') return template;
    return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => {
      return Object.prototype.hasOwnProperty.call(params, k) ? String(params[k]) : '';
    });
  };

  const translate = (key, params) => {
    const dict = messages[locale.value] || messages.en || {};
    const value = dict[key] ?? key;
    return interpolate(value, params);
  };

  return { translate, locale };
};
