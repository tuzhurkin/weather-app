<template>
  <!-- <div v-if="flagSrc" class="flag"> -->
  <div class="flag">
    <BaseImage :src="flagSrc" :alt="name || 'xx'" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import BaseImage from '@/components/Base/Image.vue';

defineOptions({
  name: 'CardFlag',
});

const props = defineProps({
  name: {
    type: String,
    default: 'xx',
  },
});

const flagSvgs = import.meta.glob('@/assets/images/flags/*.svg', {
  eager: true,
  import: 'default',
});

const normName = computed(() => {
  return props.name.toLowerCase();
});

const flagSrc = computed(() => {
  return flagSvgs[`/src/assets/images/flags/${normName.value}.svg`] ?? '';
});
</script>

<style scoped lang="scss">
.flag {
  position: relative;
  width: 32px;
  height: auto;
  overflow: hidden;
  border-radius: 6px;

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    background-color: rgba($color-grey-600, 0.25);
  }
}
</style>
