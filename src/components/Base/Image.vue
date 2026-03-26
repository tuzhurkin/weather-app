<template>
  <img :src="src" :alt="alt" />
</template>

<script setup>
defineOptions({
  name: 'BaseImage',
});

defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;

  &.cover {
    object-fit: cover;
  }
  &.fill {
    object-fit: fill;
  }
}
</style>
