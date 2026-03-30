import { ref, watch } from 'vue';
import { GEO_API_URL, API_KEY } from '@/constants/config';

export const useCitySearch = () => {
  const QUERY_MIN_LENGTH = 2;
  const REQUEST_LIMIT = 5;
  const REQUEST_DELAY = 300;

  const cache = new Map();
  let controller = null;

  const query = ref('');
  const results = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const fetchCitiesData = async query => {
    loading.value = true;

    try {
      await sleep(REQUEST_DELAY);

      const res = await fetch(
        `${GEO_API_URL}/direct?q=${query}&limit=${REQUEST_LIMIT}&appid=${API_KEY}`,
        {
          signal: controller.signal,
        }
      );
      const data = await res.json();
      results.value = data;
      cache.set(query, data);
    } catch (e) {
      if (e.name !== 'AbortError') {
        error.value = e;
      }
    } finally {
      loading.value = false;
    }
  };

  watch(query, async newQuery => {
    error.value = null;

    // if query is less than 2 characters, don't fetch data
    if (!newQuery || newQuery.length < QUERY_MIN_LENGTH) {
      results.value = [];
      return;
    }

    // if query is in cache, return data from cache
    if (cache.has(newQuery)) {
      results.value = cache.get(newQuery);
      return;
    }

    // abort previous request
    if (controller) controller.abort();
    controller = new AbortController();

    // fetch data
    await fetchCitiesData(newQuery);
  });

  return {
    query,
    results,
    loading,
    error,
  };
};
