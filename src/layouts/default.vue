<template>
  <div class="default-layout">
    <header>
      <h2>Header</h2>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <h2>Footer</h2>
    </footer>
    <ModalGlobal />
  </div>
</template>

<script setup>
import ModalGlobal from '@/components/Modal/index.vue';
</script>

<style lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    flex: 1;
  }

  header,
  footer {
    background-color: #333;
    color: #fff;
    padding: 16px;
  }
}
</style>
