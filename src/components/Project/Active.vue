<template>
  <div class="project-search">
    <Search @select="onSearch" />
  </div>
  <ProjectCards :cards="activeCards" />
  <div v-if="activeCardsLoading" class="loading">
    <BasePreloader />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCardsStore } from '@/stores/CardsStore';
import Search from '@/components/Search/index.vue';
import ProjectCards from '@/components/Project/Cards.vue';
import BasePreloader from '@/components/Base/Preloader.vue';

defineOptions({
  name: 'ProjectActive',
});

const cardsStore = useCardsStore();
const { activeCards, activeCardsLoading } = storeToRefs(cardsStore);
const { onSearch } = cardsStore;
</script>

<style scoped lang="scss">
.project-search {
  width: 50%;
  margin: 0 auto;

  @media (max-width: $sm) {
    width: 100%;
  }
}
.loading {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba($color-black, 0.5);
}
</style>
