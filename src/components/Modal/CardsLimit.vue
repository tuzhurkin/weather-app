<template>
  <Transition name="modal">
    <BaseModal class="modal-primary" :name="ModalName.CARDS_LIMIT">
      <template #top>
        <h3 class="title">
          If you want to add more cards, you need to delete some of them because you have reached
          the limit of {{ numberOfCards }} cards.
        </h3>
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

defineOptions({
  name: 'ModalCardsLimit',
});

const cardsStore = useCardsStore();
const { currentCardsLimitModal } = storeToRefs(cardsStore);

const numberOfCards = computed(() => {
  return currentCardsLimitModal.value === 'active'
    ? `${ACTIVE_CARDS_LIMIT} active`
    : `${SAVED_CARDS_LIMIT} saved`;
});
</script>

<style scoped lang="scss">
.modal-primary {
  :deep(.modal-inner) {
    max-width: 32%;
    padding: 32px;

    @media (max-width: $sm) {
      max-width: 100%;
    }

    .modal-top {
      margin-bottom: 0;
    }

    .title {
      font-weight: 600;
      font-size: 20px;
      line-height: 150%;
      letter-spacing: -0.4px;
      text-align: center;
      text-wrap: balance;
      padding: 0 36px;
    }
  }
}
</style>
