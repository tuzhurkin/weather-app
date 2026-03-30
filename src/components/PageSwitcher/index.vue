<template>
  <BaseSwitcher :options="options" :bg="true" />
</template>

<script setup>
import { computed } from 'vue';
import BaseSwitcher from '@/components/Base/Switcher.vue';
import { useTranslates } from '@/composables/useTranslates';

defineOptions({
  name: 'Switcher',
});

const { translate } = useTranslates();

const options = computed(() => [
  { value: 'active', text: translate('active'), to: '/' },
  { value: 'saved', text: translate('saved'), to: '/saved' },
]);
</script>

<style scoped lang="scss"></style>
