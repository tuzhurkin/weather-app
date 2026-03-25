<template>
  <span v-if="iconSvg" class="icon" :class="[name]" v-html="iconSvg"></span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  stroke: {
    type: String,
    default: '',
  },
  fill: {
    type: String,
    default: '',
  },
});

// Import SVGs as raw strings (no plugin needed)
const icons = import.meta.glob('@/assets/images/icons/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const iconSvg = computed(() => {
  const iconPath = `/src/assets/images/icons/${props.name}.svg`;
  return icons[iconPath] || null;
});
</script>

<style lang="scss" scoped>
.icon {
  flex-shrink: 0;
  user-select: none;

  :deep(svg) {
    display: block;
    width: 100%;
    height: 100%;
  }

  :deep(path[stroke]) {
    stroke: currentColor;
  }

  :deep(path[fill]:not([fill='none'])) {
    fill: currentColor;
  }

  &.fill {
    :deep(path) {
      transition: fill $transition ease;
    }
  }

  &:not(.fill) {
    :deep(path) {
      transition: stroke $transition ease;
    }
  }
}
</style>
