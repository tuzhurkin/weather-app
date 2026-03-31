<template>
  <span ref="container" class="icon"></span>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const container = ref(null);
let shadowRoot = null;

const icons = import.meta.glob('@/assets/images/icons/**/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const renderSvg = () => {
  const iconPath = `/src/assets/images/icons/${props.name}.svg`;
  const raw = icons[iconPath];

  if (!raw || !container.value) return;

  // create shadow root one time and insert SVG and base styles inside it
  if (!shadowRoot) {
    shadowRoot = container.value.attachShadow({ mode: 'open' });
  }
  shadowRoot.innerHTML = '';
  shadowRoot.innerHTML = `
    <style>
      :host {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
      svg {
        display: block;
        width: 100%;
        height: 100%;
      }
    </style>
    ${raw}
  `;
};

onMounted(renderSvg);
watch(() => props.name, renderSvg);
</script>

<style scoped lang="scss">
.icon {
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
