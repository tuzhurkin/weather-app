<template>
  <div
    @click.self="close"
    ref="modal"
    class="modal"
    :style="{ zIndex: 120 + modalIndex }"
    :class="[name + '-modal', { scrolly }]"
    v-lock-scroll="true"
    v-if="showModal"
  >
    <div class="modal-inner">
      <div class="modal-top" v-if="slots.top">
        <slot name="top"></slot>
        <BaseButton class="modal-close" @click="close" type="texted" icon="close" />
      </div>
      <slot />
      <div class="modal-bottom" v-if="slots.bottom">
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, useSlots } from 'vue';
import { useLayoutStore } from '@/stores/LayoutStore';
import BaseButton from '@/components/Base/Button.vue';
import vLockScroll from '@/plugins/functions/userLockScroll';

defineOptions({
  name: 'BaseModal',
});

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  scrolly: {
    type: Boolean,
    default: false,
  },
});

const modal = ref(null);

const slots = useSlots();
const store = useLayoutStore();

const emit = defineEmits(['modal-close', 'close-func', 'showModal']);

const showModal = computed(() => {
  return store.GET_ShowModal.includes(props.name);
});
const modalIndex = computed(() => {
  return store.GET_ShowModal.findIndex(modal => modal === props.name);
});

watch(showModal, value => {
  emit('showModal', value);

  if (!value) emit('modal-close');
});

const keydown = e => {
  if (e.key === 'Escape') {
    close();
  }
};

onMounted(() => {
  document.addEventListener('keydown', keydown, { passive: true });
});

onUnmounted(() => {
  document.removeEventListener('keydown', keydown, {
    passive: true,
  });
});

const close = () => {
  store.HIDE_Modal();
};
emit('close-func', close);
defineExpose({
  close,
});
</script>

<style lang="scss" scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;

  .modal-inner {
    transition: transform 0.3s ease;
    transform: none;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .modal-inner {
    transform: translate(0, 20px);
  }
}

.modal {
  z-index: 120;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  // height: var(--windowHeight);
  height: 100vh;
  padding: 16px 0;
  display: flex;
  justify-content: center;
  background-color: rgba(#0e0e0e, 0.75);
  overflow: auto;

  @media (max-width: $sm) {
    padding: 36px 16px;
    height: var(--windowHeight);
  }

  &.scrolly {
    overflow: visible;

    .modal-inner {
      max-height: calc(100vh - 32px);

      @media (max-width: $sm) {
        max-height: calc(100vh - 72px);
      }
    }
  }

  .modal-inner {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 50%;
    height: max-content;
    margin: auto;
    padding: 50px;
    border-radius: 10px;
    border: 1px solid $color-grey-600;
    background-color: $color-grey-900;

    @media (max-width: $sm) {
      max-width: 100%;
      margin-bottom: 0;
      padding: 24px 16px;
    }

    .modal-top {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 16px;
      // text-align: center;
      margin-bottom: 32px;
    }
  }

  .modal-close {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    width: 32px;
    height: 32px;
    padding: 0;

    :deep(.icon) {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
