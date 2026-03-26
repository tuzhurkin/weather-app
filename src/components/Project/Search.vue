<template>
  <div class="project-search">
    <!-- <BaseSearch
      v-bind="searchData"
      :modelValue="searchData.value"
      @update:modelValue="updateSearchValue"
    /> -->
    <BaseSearch v-bind="searchData" v-model="searchData.value" @search="onSearch" />
  </div>
</template>

<script setup>
// import { ref, watch } from 'vue';
import BaseSearch from '@/components/Base/Search.vue';

defineOptions({
  name: 'ProjectSearch',
});

const emit = defineEmits(['search']);

// const searchData = ref({
//   value: '',
//   idx: 'search',
//   name: 'search',
//   type: 'text',
//   autocomplete: 'off',
//   placeholder: 'Enter city name',
//   disabled: false,
// });

// const updateSearchValue = (value, idx) => {
//   console.log('updateSearchValue', value, idx);
//   searchData.value.value = value;
// };

const onSearch = value => {
  // console.log('onSearch', value);
  emit('search', value);
};

// watch(
//   () => searchData.value.value,
//   value => {
//     console.log('watch searchData.value', value);
//   }
// );
</script>

<style scoped lang="scss"></style>
