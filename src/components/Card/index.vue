<template>
  <div class="card">
    <div class="top"></div>
    <div class="middle"></div>
    <div class="bottom"></div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'Card',
});

defineProps({
  card: {
    type: Object,
    default: () => {},
  },
});
</script>

<style scoped lang="scss"></style>
