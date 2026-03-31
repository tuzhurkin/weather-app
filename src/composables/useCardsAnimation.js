import { storeToRefs } from 'pinia';
import { useCardsStore } from '@/stores/CardsStore';

export const useCardsAnimation = () => {
  const cardsStore = useCardsStore();
  const { activeCard } = storeToRefs(cardsStore);

  let parentEl = null;
  const onBeforeLeave = el => {
    const parent = el.parentElement;
    if (!parent) return;

    parentEl = parent;
    parent.style.height = `${parent.offsetHeight}px`;

    const parentRect = parent.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    el.style.position = 'absolute';
    el.style.top = `${rect.top - parentRect.top + parent.scrollTop}px`;
    el.style.left = `${rect.left - parentRect.left + parent.scrollLeft}px`;
    el.style.width = `${rect.width}px`;
    el.style.height = `${activeCard.value.elHeight}px`;
  };

  const onLeave = (el, done) => {
    if (!parentEl) return done();

    requestAnimationFrame(() => {
      parentEl.style.height = `${parentEl.scrollHeight}px`;
    });

    setTimeout(done, 300); // leave-duration x2
  };

  const onAfterLeave = () => {
    if (!parentEl) return;

    parentEl.style.height = '';
    parentEl = null;
  };

  return {
    onBeforeLeave,
    onLeave,
    onAfterLeave,
  };
};
