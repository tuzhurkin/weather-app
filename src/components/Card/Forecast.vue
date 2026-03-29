<template>
  <ForecastChart :chartData="forecast" />
</template>

<script setup>
import ForecastChart from '@/components/Chart/index.vue';

defineOptions({
  name: 'CardForecast',
});

defineProps({
  forecast: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped lang="scss"></style>
