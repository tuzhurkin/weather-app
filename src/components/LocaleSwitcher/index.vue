<template>
  <BaseSwitcher :options="options" :model-value="locale" @update:modelValue="setLocale" />
</template>

<script setup>
import { computed } from 'vue';
import { useLocale } from '@/composables/useLocale';
import BaseSwitcher from '@/components/Base/Switcher.vue';

defineOptions({
  name: 'LocaleSwitcher',
});

const { locale, setLocale } = useLocale();

const options = computed(() => [
  { value: 'en', text: 'EN' },
  { value: 'uk', text: 'UK' },
]);
</script>

<style scoped lang="scss"></style>
