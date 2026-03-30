import { ref } from 'vue';

const locale = ref(localStorage.getItem('locale') || 'en');

const setLocale = newLocale => {
  locale.value = newLocale;
  localStorage.setItem('locale', newLocale);
};

export const useLocale = () => {
  return { locale, setLocale };
};
