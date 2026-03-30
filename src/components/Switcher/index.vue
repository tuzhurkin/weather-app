<template>
  <div class="switcher">
    <BaseButton tag="router-link" type="texted" to="/">Active</BaseButton>
    <BaseButton tag="router-link" type="texted" to="/saved">Saved</BaseButton>
  </div>
</template>

<script setup>
import BaseButton from '@/components/Base/Button.vue';

defineOptions({
  name: 'Switcher',
});
</script>

<style scoped lang="scss">
.switcher {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
  padding: 8px;
  margin: 0 auto;
  background-color: $color-grey-600;
  border-radius: 12px;

  :deep(.btn) {
    min-height: 36px;
    padding: 0 32px;
    border-radius: 10px;
    background-color: transparent;
    transition:
      background-color $transition ease,
      color $transition ease;

    &.router-link-active {
      color: $color-grey-800;
      background-color: $color-yellow;
    }
    &:not(.router-link-active) {
      @include hover {
        color: $color-white;
      }
      &:focus {
        color: $color-white;
      }
      &:active {
        color: $color-white;
      }
    }
  }
}
</style>
