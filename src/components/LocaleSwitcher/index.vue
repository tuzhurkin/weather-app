<template>
  <div class="locale-switcher">
    <BaseButton type="texted" :class="{ active: locale === 'en' }" @click="setLocale('en')">
      EN
    </BaseButton>
    <BaseButton type="texted" :class="{ active: locale === 'uk' }" @click="setLocale('uk')">
      UK
    </BaseButton>
  </div>
</template>

<script setup>
import { useLocale } from '@/composables/useLocale';
import BaseButton from '@/components/Base/Button.vue';

defineOptions({
  name: 'LocaleSwitcher',
});

const { locale, setLocale } = useLocale();
</script>

<style scoped lang="scss">
.locale-switcher {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  :deep(.btn) {
    min-height: 32px;
    padding: 0 12px;
    border-radius: 10px;
    background-color: transparent;
    color: $color-grey-200;

    &.active {
      color: $color-grey-800;
      background-color: $color-yellow;
    }
  }
}
</style>
