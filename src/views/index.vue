<template>
  <div class="default-page main-page">
    <div class="switcher-wrapper">
      <PageSwitcher />
    </div>
    <Project>
      <ProjectActive />
    </Project>
  </div>
</template>

<script setup>
import PageSwitcher from '@/components/PageSwitcher/index.vue';
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
  margin: 32px auto 0;

  @media (max-width: $sm) {
    margin: 16px auto 0;
    padding: 0 16px;
  }
}
</style>
