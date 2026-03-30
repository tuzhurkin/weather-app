<template>
  <Transition name="modal">
    <BaseModal class="modal-primary" :name="ModalName.NO_CITIES_FOUND">
      <template #top>
        <h3 class="title">
          {{ translate('modal_no_cities_found_title', { name: activeCitySearchValue }) }}
        </h3>
      </template>
    </BaseModal>
  </Transition>
</template>

<script setup>
import { ModalName } from '@/constants/modal';
import { storeToRefs } from 'pinia';
import { useCardsStore } from '@/stores/CardsStore';
import BaseModal from '@/components/Base/Modal.vue';
import { useTranslates } from '@/composables/useTranslates';

defineOptions({
  name: 'ModalAlreadyAdded',
});

const cardsStore = useCardsStore();
const { activeCitySearchValue } = storeToRefs(cardsStore);
const { translate } = useTranslates();
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
