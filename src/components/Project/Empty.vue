<template>
  <div class="empty">
    <h2 class="empty-title">{{ translate('no_saved_cards_title') }}</h2>
  </div>
</template>

<script setup>
import { useTranslates } from '@/composables/useTranslates';

defineOptions({
  name: 'ProjectEmpty',
});

const { translate } = useTranslates();
</script>

<style scoped lang="scss">
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;

  @media (max-width: $sm) {
    padding: 32px 16px;
  }

  .empty-title {
    width: 50%;
    font-size: 24px;
    line-height: 150%;
    font-weight: 600;
    color: $color-white;
    text-align: center;

    @media (max-width: $sm) {
      width: 100%;
      font-size: 18px;
    }
  }
}
</style>
