<template>
  <h1>Active</h1>
  <div class="project-search">
    <Search @select="onSearch" />
  </div>
  <ProjectCards :cards="activeCards" />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCardsStore } from '@/stores/CardsStore';
import Search from '@/components/Search/index.vue';
import ProjectCards from '@/components/Project/Cards.vue';

defineOptions({
  name: 'ProjectActive',
});

const cardsStore = useCardsStore();
const { activeCards } = storeToRefs(cardsStore);
const { onSearch } = cardsStore;
</script>

<style scoped lang="scss">
.project-search {
  width: 50%;
  margin: 0 auto;
}
</style>
