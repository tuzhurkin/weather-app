<template>
  <div class="default-page main-page">
    <div class="switcher-wrapper">
      <Switcher />
    </div>
    <Project>
      <ProjectActive />
    </Project>
  </div>
</template>

<script setup>
import Switcher from '@/components/Switcher/index.vue';
import Project from '@/components/Project/index.vue';
import ProjectActive from '@/components/Project/Active.vue';

defineOptions({
  name: 'MainPage',
});
</script>

<style scoped lang="scss">
.switcher-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 32px auto;

  @media (max-width: $sm) {
    margin: 16px auto;
    padding: 0 16px;
  }
}
</style>
