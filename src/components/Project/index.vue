<template>
  <div class="project">
    <h1>Project</h1>
    <!-- <ProjectSearch @search="onSearch" /> -->
    <div class="project-search">
      <Search @select="onSearch" />
    </div>
    <ProjectCards :cards="cards" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { API_KEY } from '@/constants/config';
// import ProjectSearch from '@/components/Project/Search.vue';
import Search from '@/components/Search/index.vue';
import ProjectCards from '@/components/Project/Cards.vue';

defineOptions({
  name: 'Project',
});

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_URL_CITIES = 'https://api.openweathermap.org/geo/1.0/direct';
const citySearchValue = ref('');
const loading = ref(false);

const fetchCitiesData = async () => {
  if (!citySearchValue.value) return;

  // const response = await fetch(`${API_URL_CITIES}?q=${citySearchValue.value}&limit=5&appid=${API_KEY}`);
  const response = await fetch(`${API_URL_CITIES}?q=be&limit=5&appid=${API_KEY}`);
  const data = await response.json();
  console.log('fetchCitiesData', data);
};

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

    cardData.value = data;
    console.log('fetchWeatherData', data);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const cardData = ref({});
const activeCard = ref([]);
const cards = ref([]);

const buildCard = () => {
  const card = {
    id: cardData.value.id,
    city: cardData.value.name,
    country: cardData.value.sys.country,
    temperature: cardData.value.main.temp,
    feels_like: cardData.value.main.feels_like,
    wind_speed: cardData.value.wind.speed,
    humidity: cardData.value.main.humidity,
    title: cardData.value.weather[0].main,
    description: cardData.value.weather[0].description,
    icon: cardData.value.weather[0].icon,
  };
  activeCard.value = card;
};

const onSearch = value => {
  citySearchValue.value = value;
};

// on search change
watch(citySearchValue, async value => {
  console.log('watch citySearchValue', value);
  await fetchWeatherData();
});

onMounted(async () => {
  // fetchWeatherData();
  // await fetchCitiesData();
});
</script>

<style scoped lang="scss">
.project {
  max-width: 1200px;
  margin: 32px auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-height: 360px;
  padding: 32px;
  border: 1px solid $color-grey-500;
  border-radius: 16px;

  .project-search {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
