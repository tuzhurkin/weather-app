<template>
  <div class="project-cards">
    <Card class="project-card" v-for="card in cards" :key="card.id" />
  </div>
</template>

<script setup>
import Card from '@/components/Card/index.vue';

defineOptions({
  name: 'ProjectCards',
});

defineProps({
  cards: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped lang="scss"></style>
