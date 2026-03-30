import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { API_KEY, API_URL, ACTIVE_CARDS_LIMIT, SAVED_CARDS_LIMIT } from '@/constants/config';
import { ModalName } from '@/constants/modal';
import { useLayoutStore } from '@/stores/LayoutStore';
import { useRoute } from 'vue-router';
import { useLocale } from '@/composables/useLocale';

export const useCardsStore = defineStore('cards', () => {
  const route = useRoute();
  const store = useLayoutStore();
  const { locale } = useLocale();

  const isPageSaved = computed(() => route.name === 'SavedPage');
  const currentCardsLimitModal = ref('active'); // 'active' | 'saved'

  const activeCitySearchValue = ref('');
  const activeCity = ref(null);
  const activeCard = ref(null);
  const activeCards = ref([]);
  const savedCards = ref([]);
  const storedCards = ref([]); // cards written to localStorage in format: [{ id, name, lat, lon }]

  const loading = ref(false);
  const error = ref(null);

  const fetchWeatherData = async ({ lat, lon }) => {
    const response = await fetch(
      `${API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${locale.value}&units=metric`
    );
    const data = await response.json();
    const success = data.cod === 200 || data.cod === '200';
    if (!success) throw new Error(data.message);
    return data;
  };

  const fetchForecastData = async ({ lat, lon }) => {
    const response = await fetch(
      `${API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${locale.value}&units=metric`
    );
    const data = await response.json();
    const success = data.cod === 200 || data.cod === '200';
    if (!success) throw new Error(data.message);
    return data;
  };

  const fetchAndBuildCard = async ({ name, lat, lon, local_names }) => {
    const [weatherData, forecastData] = await Promise.all([
      fetchWeatherData({ lat, lon }),
      fetchForecastData({ lat, lon }),
    ]);
    const timezoneOffset = weatherData.timezone; // seconds offset from UTC
    const dayForecast = get24HoursForecast(forecastData, timezoneOffset);
    const weekForecast = get5DayForecast(forecastData, timezoneOffset);
    // use geo city name as weather API returns imprecise names
    return buildCard({ ...weatherData, name, local_names: local_names || {} }, lat, lon, dayForecast, weekForecast);
  };

  const requestCityData = async () => {
    const city = activeCity.value;
    if (!city?.name || !city?.lat || !city?.lon) return;

    loading.value = true;
    error.value = null;
    try {
      const card = await fetchAndBuildCard(city);
      addCard(card);
    } catch (err) {
      error.value = err.message;
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchStoredCards = async () => {
    if (!storedCards.value.length) return;

    loading.value = true;
    try {
      const cards = await Promise.all(storedCards.value.map(fetchAndBuildCard));
      savedCards.value = cards;
    } catch (err) {
      console.error('Failed to fetch stored cards:', err);
    } finally {
      loading.value = false;
    }
  };

  const toLocalHHMM = (utcEpochSeconds, timezoneOffsetSeconds) => {
    const d = new Date((utcEpochSeconds + timezoneOffsetSeconds) * 1000);
    return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`;
  };

  const toLocalDateKey = (utcEpochSeconds, timezoneOffsetSeconds) => {
    const d = new Date((utcEpochSeconds + timezoneOffsetSeconds) * 1000);
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
  };

  // const getTodayForecast = forecastData => {
  //   const today = new Date().toISOString().split('T')[0];
  //   return forecastData.list.filter(item => item.dt_txt.startsWith(today));
  // };

  const get24HoursForecast = (forecastData, timezoneOffset) => {
    const now = Date.now() / 1000;
    const in24h = now + 86400; // 24 hours in seconds
    return forecastData.list
      .filter(item => item.dt >= now && item.dt <= in24h)
      .map(item => ({
        label: toLocalHHMM(item.dt, timezoneOffset),
        temp: Math.round(item.main.temp),
      }));
  };

  const get5DayForecast = (forecastData, timezoneOffset) => {
    const groups = {};
    forecastData.list.forEach(item => {
      const date = toLocalDateKey(item.dt, timezoneOffset);
      if (!groups[date]) groups[date] = [];
      groups[date].push(item.main.temp);
    });

    return Object.entries(groups)
      .slice(0, 5)
      .map(([date, temps]) => {
        const temp = Math.round(temps.reduce((sum, t) => sum + t, 0) / temps.length);
        return { date, temp };
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

  const buildCard = (card, lat, lon, dayForecast = [], weekForecast = []) => {
    return {
      id: card.id,
      city: card.name,
      local_names: card.local_names || {},
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
      timezoneOffset: card.timezone,
      lat,
      lon,
      dayForecast,
      weekForecast,
    };
  };

  const addCard = card => {
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

    activeCards.value.unshift(card);
  };

  // add to saved
  const saveCard = card => {
    if (storedCards.value.length >= SAVED_CARDS_LIMIT) {
      setCurrentCardsLimitModal('saved');
      store.SHOW_Modal(ModalName.CARDS_LIMIT);
      return;
    }

    if (isCardSaved(card)) {
      setActiveCard(card);
      store.SHOW_Modal(ModalName.ALREADY_ADDED);
      return;
    }

    storedCards.value.unshift({ id: card.id, name: card.city, lat: card.lat, lon: card.lon, local_names: card.local_names || {} });
    savedCards.value.unshift(card);
  };

  // remove card from saved cards
  const unsaveCard = card => {
    if (!isCardSaved(card)) return;

    storedCards.value = storedCards.value.filter(c => c.id !== card.id);
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
    return storedCards.value.some(c => c.id === card.id);
  };

  // initialize stored cards from localStorage and fetch fresh data
  const storedCardsData = localStorage.getItem('storedCards');
  if (storedCardsData) {
    storedCards.value = JSON.parse(storedCardsData);
    fetchStoredCards();
  }

  watch(
    () => storedCards.value,
    newVal => {
      localStorage.setItem('storedCards', JSON.stringify(newVal));
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
    storedCards,
    loading,
    error,
    setCurrentCardsLimitModal,
    setActiveCitySearchValue,
    setActiveCity,
    onSearch,
    addCard,
    saveCard,
    unsaveCard,
    deleteCard,
    setActiveCard,
    isCardActive,
    isCardSaved,
  };
});
