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
  max-width: 1200px;
  margin: 32px auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-height: 360px;
  padding: 32px;
  border: 1px solid $color-grey-500;
  border-radius: 16px;

  .project-search {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
