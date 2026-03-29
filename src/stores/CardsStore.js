import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { API_KEY, API_URL, ACTIVE_CARDS_LIMIT, SAVED_CARDS_LIMIT } from '@/constants/config';
import { ModalName } from '@/constants/modal';
import { useLayoutStore } from '@/stores/LayoutStore';
import { useRoute } from 'vue-router';

export const useCardsStore = defineStore('cards', () => {
  const route = useRoute();
  const store = useLayoutStore();

  const isPageSaved = computed(() => route.name === 'SavedPage');
  const currentCardsLimitModal = ref('active'); // 'active' | 'saved'

  const activeCitySearchValue = ref('');
  const activeCity = ref(null);
  const activeCard = ref(null);
  const activeCards = ref([]);
  const savedCards = ref([]);

  const loading = ref(false);
  const error = ref(null);

  const fetchWeatherData = async ({ lat, lon }) => {
    const response = await fetch(
      `${API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    const success = data.cod === 200 || data.cod === '200';
    if (!success) throw new Error(data.message);
    return data;
  };

  const fetchForecastData = async ({ lat, lon }) => {
    const response = await fetch(
      `${API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    const success = data.cod === 200 || data.cod === '200';
    if (!success) throw new Error(data.message);
    return data;
  };

  const requestCityData = async () => {
    const { name, lat, lon } = activeCity.value;
    if (!name || !lat || !lon) return;

    loading.value = true;
    error.value = null;
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherData({ lat, lon }),
        fetchForecastData({ lat, lon }),
      ]);

      const dayForecast = get24HoursForecast(forecastData);
      const weekForecast = get5DayForecast(forecastData);

      // use geo city name as weather API returns imprecise names
      addCard({ ...weatherData, name }, dayForecast, weekForecast);
    } catch (err) {
      error.value = err.message;
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // const getTodayForecast = forecastData => {
  //   const today = new Date().toISOString().split('T')[0];
  //   return forecastData.list.filter(item => item.dt_txt.startsWith(today));
  // };

  const get24HoursForecast = forecastData => {
    const now = Date.now() / 1000;
    const in24h = now + 86400; // 24 hours in seconds
    return forecastData.list
      .filter(item => item.dt >= now && item.dt <= in24h)
      .map(item => ({
        label: item.dt_txt.split(' ')[1].slice(0, 5),
        temp: Math.round(item.main.temp),
      }));
  };

  const get5DayForecast = forecastData => {
    const groups = {};
    forecastData.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!groups[date]) groups[date] = [];
      groups[date].push(item.main.temp);
    });

    return Object.entries(groups)
      .slice(0, 5)
      .map(([date, temps]) => {
        const temp = Math.round(temps.reduce((sum, t) => sum + t, 0) / temps.length);
        const label = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
        return { label, temp };
      });
  };

  const setCurrentCardsLimitModal = modal => {
    currentCardsLimitModal.value = modal;
  };

  const setActiveCitySearchValue = value => {
    activeCitySearchValue.value = value;
  };

  const setActiveCity = city => {
    activeCity.value = city;
  };

  const onSearch = async value => {
    setActiveCity(value);
    await requestCityData();
  };

  const buildCard = (card, dayForecast = [], weekForecast = []) => {
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
      dayForecast,
      weekForecast,
    };
  };

  const addCard = (card, dayForecast = [], weekForecast = []) => {
    if (isCardActive(card)) {
      setActiveCard(card);
      store.SHOW_Modal(ModalName.ALREADY_ADDED);
      return;
    }

    if (activeCards.value.length >= ACTIVE_CARDS_LIMIT) {
      setCurrentCardsLimitModal('active');
      store.SHOW_Modal(ModalName.CARDS_LIMIT);
      return;
    }

    activeCards.value.unshift(buildCard(card, dayForecast, weekForecast));
  };

  // add to saved
  const saveCard = card => {
    if (savedCards.value.length >= SAVED_CARDS_LIMIT) {
      setCurrentCardsLimitModal('saved');
      store.SHOW_Modal(ModalName.CARDS_LIMIT);
      return;
    }

    if (isCardSaved(card)) {
      setActiveCard(card);
      store.SHOW_Modal(ModalName.ALREADY_ADDED);
      return;
    }

    savedCards.value.unshift(card);
  };

  // remove card from saved cards
  const unsaveCard = card => {
    if (!isCardSaved(card)) return;

    savedCards.value = savedCards.value.filter(c => c.id !== card.id);
  };

  // remove card from active cards
  const deleteCard = card => {
    if (!isCardActive(card)) return;

    activeCards.value = activeCards.value.filter(c => c.id !== card.id);
  };

  const setActiveCard = card => {
    activeCard.value = card;
  };

  const isCardActive = card => {
    return activeCards.value.some(c => c.id === card.id);
  };

  const isCardSaved = card => {
    return savedCards.value.some(c => c.id === card.id);
  };

  // initialize saved cards from localStorage
  const savedCardsData = localStorage.getItem('savedCards');
  if (savedCardsData) {
    savedCards.value = JSON.parse(savedCardsData);
  }

  watch(
    () => savedCards.value,
    newVal => {
      localStorage.setItem('savedCards', JSON.stringify(newVal));
    },
    { deep: true }
  );

  return {
    isPageSaved,
    currentCardsLimitModal,
    activeCitySearchValue,
    activeCity,
    activeCard,
    activeCards,
    savedCards,
    loading,
    error,
    setCurrentCardsLimitModal,
    setActiveCitySearchValue,
    setActiveCity,
    onSearch,
    buildCard,
    addCard,
    saveCard,
    unsaveCard,
    deleteCard,
    setActiveCard,
    isCardActive,
    isCardSaved,
  };
});
