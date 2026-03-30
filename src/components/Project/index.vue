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
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 1200px;
  min-width: 360px;
  margin: 0 auto;
  min-height: 360px;
  padding: 32px;

  @media (max-width: $sm) {
    padding: 16px;
  }
}
</style>
