<template>
  <TransitionGroup
    tag="div"
    class="project-cards"
    name="card"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <Card class="project-card" v-for="card in cards" :key="card.id" :card="card" />
  </TransitionGroup>
</template>

<script setup>
import Card from '@/components/Card/index.vue';
import { useCardsAnimation } from '@/composables/useCardsAnimation';

defineOptions({
  name: 'ProjectCards',
});

defineProps({
  cards: {
    type: Array,
    default: () => [],
  },
});

const { onBeforeLeave, onLeave, onAfterLeave } = useCardsAnimation();
</script>

<style scoped lang="scss">
$enter-duration: 0.5s;
$leave-duration: 0.15s;

.card-enter-active {
  transition:
    opacity $enter-duration ease,
    transform $enter-duration ease;
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
  transition:
    opacity $leave-duration ease,
    transform $leave-duration ease;
}

.card-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.card-leave-to {
  opacity: 0;
  transform: translateY(32px);
}

.card-move {
  transition: transform $enter-duration ease;
}

.project-cards {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
