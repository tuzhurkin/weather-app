<template>
  <TransitionGroup tag="div" class="project-cards" name="card">
    <Card class="project-card" v-for="card in cards" :key="card.id" :card="card" />
  </TransitionGroup>
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
.card-enter-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.card-enter-from {
  opacity: 0;
  transform: translateY(-32px);
}

.card-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.card-move {
  transition: transform 0.5s ease;
}

.project-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
