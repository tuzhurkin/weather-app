import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useCardsStore } from '@/stores/CardsStore';

export const useCardReveal = card => {
  const cardsStore = useCardsStore();
  const { isCardAnimated } = cardsStore;

  const revealing = ref(isCardAnimated(card));
  let cleanupTimer = null;

  onMounted(() => {
    cleanupTimer = setTimeout(() => {
      revealing.value = false;
    }, 1500);
  });

  onBeforeUnmount(() => {
    clearTimeout(cleanupTimer);
  });

  return {
    revealing,
  };
};
