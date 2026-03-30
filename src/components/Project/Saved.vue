<template>
  <!-- <h1>Saved</h1> -->
  <ProjectCards :cards="savedCards" />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCardsStore } from '@/stores/CardsStore';
import ProjectCards from '@/components/Project/Cards.vue';

defineOptions({
  name: 'ProjectSaved',
});

const cardsStore = useCardsStore();
const { savedCards } = storeToRefs(cardsStore);
</script>

<style scoped lang="scss"></style>
