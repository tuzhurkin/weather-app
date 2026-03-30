<template>
  <Transition name="modal">
    <BaseModal class="modal-primary" :name="ModalName.CARDS_LIMIT">
      <template #top>
        <h3 class="title">{{ title }}</h3>
      </template>
    </BaseModal>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';
import { ModalName } from '@/constants/modal';
import { ACTIVE_CARDS_LIMIT, SAVED_CARDS_LIMIT } from '@/constants/config';
import { storeToRefs } from 'pinia';
import { useCardsStore } from '@/stores/CardsStore';
import BaseModal from '@/components/Base/Modal.vue';
import { useTranslates } from '@/composables/useTranslates';

defineOptions({
  name: 'ModalCardsLimit',
});

const cardsStore = useCardsStore();
const { currentCardsLimitModal } = storeToRefs(cardsStore);
const { translate } = useTranslates();

const title = computed(() => {
  return currentCardsLimitModal.value === 'active'
    ? translate('modal_active_cards_limit_title', { cards: ACTIVE_CARDS_LIMIT })
    : translate('modal_saved_cards_limit_title', { cards: SAVED_CARDS_LIMIT });
});
</script>

<style scoped lang="scss">
.modal-primary {
  :deep(.modal-inner) {
    .modal-top {
      margin-bottom: 0;
    }
  }
}
</style>
