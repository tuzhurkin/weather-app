<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Page not found</p>
  </div>
</template>

<script setup>
defineOptions({
  name: 'NotFound',
});
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
</style>
