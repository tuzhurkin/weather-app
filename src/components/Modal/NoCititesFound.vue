<template>
  <Transition name="modal">
    <BaseModal class="modal-primary" :name="ModalName.NO_CITIES_FOUND">
      <template #top>
        <h3 class="title">City "{{ activeCitySearchValue }}" is not found.</h3>
      </template>
    </BaseModal>
  </Transition>
</template>

<script setup>
import { ModalName } from '@/constants/modal';
import { storeToRefs } from 'pinia';
import { useCardsStore } from '@/stores/CardsStore';
import BaseModal from '@/components/Base/Modal.vue';

defineOptions({
  name: 'ModalAlreadyAdded',
});

const cardsStore = useCardsStore();
const { activeCitySearchValue } = storeToRefs(cardsStore);
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
