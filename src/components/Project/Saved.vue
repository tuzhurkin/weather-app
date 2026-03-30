<template>
  <ProjectCards :cards="savedCards" />
  <div v-if="storedCardsLoading" class="loading">
    <BasePreloader />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCardsStore } from '@/stores/CardsStore';
import ProjectCards from '@/components/Project/Cards.vue';
import BasePreloader from '@/components/Base/Preloader.vue';

defineOptions({
  name: 'ProjectSaved',
});

const cardsStore = useCardsStore();
const { savedCards, storedCardsLoading } = storeToRefs(cardsStore);
</script>

<style scoped lang="scss">
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
