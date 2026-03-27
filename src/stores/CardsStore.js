import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { API_KEY, API_URL } from '@/constants/config';
import { useRoute } from 'vue-router';

export const useCardsStore = defineStore('cards', () => {
  const route = useRoute();
  const isPageSaved = computed(() => route.name === 'SavedPage');

  const activeCards = ref([]);
  const savedCards = ref([]);

  const citySearchValue = ref('');
  const loading = ref(false);
  const error = ref(null);

  const fetchWeatherData = async () => {
    if (!citySearchValue.value) return;

    loading.value = true;
    try {
      const response = await fetch(
        `${API_URL}?q=${citySearchValue.value}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      const success = data.cod === 200;
      if (!success) throw new Error(data.message);

      console.log('fetchWeatherData', data);
      addCard(data);
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const onSearch = async value => {
    citySearchValue.value = value;
    await fetchWeatherData();
  };

  const buildCard = card => {
    return {
      id: card.id,
      city: card.name,
      country: card.sys.country,
      temp: card.main.temp,
      temp_min: card.main.temp_min,
      temp_max: card.main.temp_max,
      feels_like: card.main.feels_like,
      wind: card.wind.speed,
      humidity: card.main.humidity,
      title: card.weather[0].main,
      description: card.weather[0].description,
      icon: card.weather[0].icon,
    };
  };

  const addCard = card => {
    if (activeCards.value.find(c => c.id === card.id)) return;

    const builtCard = buildCard(card);
    activeCards.value.unshift(builtCard);
  };

  const saveCard = card => {
    if (savedCards.value.find(c => c.id === card.id)) {
      savedCards.value = savedCards.value.filter(c => c.id !== card.id);
    } else {
      savedCards.value.unshift(card);
    }
  };

  const deleteCard = card => {
    console.log('deleteCard', card, activeCards.value);
    activeCards.value = activeCards.value.filter(c => c.id !== card.id);
  };

  return {
    isPageSaved,
    activeCards,
    savedCards,
    citySearchValue,
    loading,
    error,
    buildCard,
    onSearch,
    saveCard,
    deleteCard,
  };
});
