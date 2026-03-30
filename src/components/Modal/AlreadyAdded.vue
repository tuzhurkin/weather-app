<template>
  <Transition name="modal">
    <BaseModal class="modal-primary" :name="ModalName.ALREADY_ADDED">
      <template #top>
        <h3 class="title">
          {{ translate('modal_already_added_title', { name: localizedCity }) }}
        </h3>
      </template>
    </BaseModal>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';
import { ModalName } from '@/constants/modal';
import { storeToRefs } from 'pinia';
import { useCardsStore } from '@/stores/CardsStore';
import BaseModal from '@/components/Base/Modal.vue';
import { useLocale } from '@/composables/useLocale';
import { useTranslates } from '@/composables/useTranslates';

defineOptions({
  name: 'ModalAlreadyAdded',
});

const cardsStore = useCardsStore();
const { activeCard } = storeToRefs(cardsStore);
const { locale } = useLocale();
const { translate } = useTranslates();

const localizedCity = computed(
  () => activeCard.value.local_names?.[locale.value] || activeCard.value.city
);
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
