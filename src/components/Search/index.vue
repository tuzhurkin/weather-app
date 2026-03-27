<template>
  <div class="search-autocomplete">
    <BaseSearch v-bind="searchData" v-model="query" @search="onSearch" />
    <div v-show="isResultsVisible" v-on-click-outside="onClickOutside" class="results-box">
      <ul v-if="!loading" class="results">
        <li v-for="result in results" :key="result.id" @click="selectCity(result)" class="result">
          <span class="name">{{ result.name }}, </span>
          <span class="country">{{ result.country }} </span>
          <span v-if="result.state" class="state"> ({{ result.state }})</span>
        </li>
      </ul>
      <div v-if="loading" class="loading">
        <BasePreloader />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import BaseSearch from '@/components/Base/Search.vue';
import BasePreloader from '@/components/Base/Preloader.vue';
import { useCitySearch } from '@/composables/useCitySearch';

defineOptions({
  name: 'SearchAutocomplete',
});

const { query, results, loading } = useCitySearch();

const emit = defineEmits(['select']);

const searchData = computed(() => ({
  value: query.value,
  idx: 'search',
  name: 'search',
  type: 'text',
  autocomplete: 'off',
  placeholder: 'Enter city name',
  disabled: false,
}));
const open = ref(false);
const isResultsVisible = computed(() => results.value.length > 0 && open.value);

watch(results, value => {
  open.value = Boolean(value.length);
});

const selectCity = city => {
  const cityName = city.name;
  emit('select', cityName);
  open.value = false;
};

const onSearch = value => {
  emit('select', value);
  open.value = false;
};

const onClickOutside = () => {
  if (open.value) open.value = false;
};
</script>

<style scoped lang="scss">
.search-autocomplete {
  position: relative;

  .results-box {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    z-index: 3;
    overflow: hidden;
    width: 100%;
    background-color: $color-grey-700;
    border-radius: 10px;
    box-shadow: 0 20px 32px rgba(0, 0, 0, 0.5);

    .results {
      .result {
        padding: 8px 16px;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        letter-spacing: -0.28px;
        color: $color-grey-200;
        transition: color $transition ease;
        cursor: pointer;
        @include noTap;

        @include hover {
          background-color: $color-grey-600;
        }

        &:first-child {
          padding-top: 12px;
        }

        &:last-child {
          padding-bottom: 12px;
        }
      }
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 16px;
    }
  }
}
</style>
