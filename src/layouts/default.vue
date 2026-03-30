<template>
  <div class="default-layout">
    <header>
      <div class="header-inner">
        <h2>Header</h2>
        <LocaleSwitcher />
      </div>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <div class="footer-inner">
        <h2>Footer</h2>
      </div>
    </footer>
    <ModalGlobal />
  </div>
</template>

<script setup>
import ModalGlobal from '@/components/Modal/index.vue';
import LocaleSwitcher from '@/components/LocaleSwitcher/index.vue';
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

  header {
    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }
  }

  footer {
    .footer-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }
  }
}
</style>
