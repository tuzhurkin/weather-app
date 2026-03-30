<template>
  <div class="project">
    <slot />
  </div>
</template>

<script setup>
defineOptions({
  name: 'Project',
});
</script>

<style scoped lang="scss">
.project {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 1200px;
  min-width: 360px;
  min-height: 360px;
  margin: 0 auto;
  padding: 32px;

  @media (max-width: $sm) {
    gap: 16px;
    padding: 16px;
  }
}
</style>
