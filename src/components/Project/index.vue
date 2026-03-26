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
import { ref, watch } from 'vue';
import { API_KEY, API_URL } from '@/constants/config';
// import ProjectSearch from '@/components/Project/Search.vue';
import Search from '@/components/Search/index.vue';
import ProjectCards from '@/components/Project/Cards.vue';

defineOptions({
  name: 'Project',
});

const citySearchValue = ref('');
const loading = ref(false);

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
    cards.value.push(buildCard(cardData.value));
    console.log('fetchWeatherData', data);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const cardData = ref({});
// const activeCard = ref([]);
const cards = ref([]);

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

const onSearch = value => {
  citySearchValue.value = value;
};

// on search change
watch(citySearchValue, async value => {
  console.log('watch citySearchValue', value);
  await fetchWeatherData();
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
