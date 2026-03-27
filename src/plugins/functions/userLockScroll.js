import { HoldScrollPagePosition } from './holdScrollPage';
import { useLayoutStore } from '@/stores/LayoutStore';
const UNLOCK_SCROLL_DELAY = 300;

export default {
  mounted(el, binding) {
    if (binding.value) lockScroll();
  },
  updated(el, binding) {
    if (binding.value) lockScroll();
    else setTimeout(unlockScroll, UNLOCK_SCROLL_DELAY);
  },
  unmounted(el, binding) {
    const store = useLayoutStore();

    if (binding.value && !store.GET_ShowModal.length) setTimeout(unlockScroll, UNLOCK_SCROLL_DELAY);
  },
};

function hasScrollOnBody() {
  const bodyScrollHeight = document.body.scrollHeight;
  const viewportHeight = window.innerHeight;
  return bodyScrollHeight > viewportHeight;
}

function lockScroll() {
  document.body.classList.add('scrolllock');
  if (!hasScrollOnBody()) document.body.classList.add('no-scroll');
  document.body.setAttribute('data-lenis-prevent', 'true');
  HoldScrollPagePosition(true);
}

function unlockScroll() {
  document.body.classList.remove('scrolllock', 'no-scroll');
  document.body.setAttribute('data-lenis-prevent', 'false');
  HoldScrollPagePosition(false);
}
