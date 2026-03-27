<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { setWindowSize } from '@/plugins/functions/vhCheck';
import { useLayoutStore } from '@/stores/LayoutStore';
import DefaultLayout from './layouts/default.vue';

const store = useLayoutStore();
const mounted = ref(false);

const resize = () => {
  setWindowSize();
  store.setDocScreenSize();
};

setWindowSize();

onMounted(() => {
  setWindowSize();
  store.setDocScreenSize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(() => {
    mounted.value = true;
  });
});

onUnmounted(() => window.removeEventListener('resize', resize));
</script>

<style scoped lang="scss"></style>
