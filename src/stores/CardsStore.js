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
  const activeCard = ref(null);

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

  const setCurrentCardsLimitModal = modal => {
    currentCardsLimitModal.value = modal;
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
    if (activeCards.value.length >= ACTIVE_CARDS_LIMIT) {
      setCurrentCardsLimitModal('active');
      store.SHOW_Modal(ModalName.CARDS_LIMIT);
      return;
    }

    if (isCardActive(card)) {
      setActiveCard(card);
      store.SHOW_Modal(ModalName.ALREADY_ADDED);
      return;
    }

    const builtCard = buildCard(card);
    activeCards.value.unshift(builtCard);
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
    activeCard,
    activeCards,
    savedCards,
    citySearchValue,
    loading,
    error,
    buildCard,
    onSearch,
    saveCard,
    unsaveCard,
    deleteCard,
    setActiveCard,
    setCurrentCardsLimitModal,
    isCardActive,
    isCardSaved,
  };
});
