<template>
  <TransitionGroup tag="div" class="project-cards" name="card" @before-leave="onCardBeforeLeave">
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

const onCardBeforeLeave = el => {
  const parent = el.parentElement;
  if (!parent) return;

  const parentRect = parent.getBoundingClientRect();
  const rect = el.getBoundingClientRect();

  el.style.position = 'absolute';
  el.style.top = `${rect.top - parentRect.top + parent.scrollTop}px`;
  el.style.left = `${rect.left - parentRect.left + parent.scrollLeft}px`;
  el.style.width = `${rect.width}px`;
};
</script>

<style scoped lang="scss">
.card-enter-active,
.card-leave-active {
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

.card-leave-active {
  position: absolute;
}

.card-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.card-leave-to {
  opacity: 0;
  transform: translateY(-32px);
}

.card-move {
  transition: transform 0.5s ease;
}

.project-cards {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
