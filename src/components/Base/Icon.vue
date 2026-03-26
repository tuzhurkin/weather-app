<template>
  <span v-if="iconSvg" class="icon" :class="[name]" v-html="iconSvg"></span>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue';

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

const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);

// import svg icons as raw strings (no plugin needed)
const icons = import.meta.glob('@/assets/images/icons/**/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const iconSvg = computed(() => {
  const iconPath = `/src/assets/images/icons/${props.name}.svg`;
  const raw = icons[iconPath];
  if (!raw) return null;

  // scope all svg ids to this instance to prevent collisions using component instance uid
  // when multiple icons are rendered on the same page
  const ids = [...raw.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  return ids.reduce((svg, id) => {
    const scoped = `${uid}-${id}`;
    return svg
      .replaceAll(`id="${id}"`, `id="${scoped}"`)
      .replaceAll(`url(#${id})`, `url(#${scoped})`)
      .replaceAll(`href="#${id}"`, `href="#${scoped}"`)
      .replaceAll(`xlink:href="#${id}"`, `xlink:href="#${scoped}"`);
  }, raw);
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

  :deep(path[stroke]),
  :deep(rect[stroke]),
  :deep(circle[stroke]) {
    stroke: currentColor;
  }

  :deep(path[fill]:not([fill='none'])),
  :deep(rect[fill]:not([fill='none'])),
  :deep(circle[fill]:not([fill='none'])) {
    fill: currentColor;
  }

  &.fill {
    :deep(path),
    :deep(rect),
    :deep(circle) {
      transition: fill $transition ease;
    }
  }

  &:not(.fill) {
    :deep(path),
    :deep(rect),
    :deep(circle) {
      transition: stroke $transition ease;
    }
  }
}
</style>
