<template>
  <div class="project-cards">
    <Card class="project-card" v-for="card in cards" :key="card.id" :card="card" />
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

<style scoped lang="scss">
.project-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
