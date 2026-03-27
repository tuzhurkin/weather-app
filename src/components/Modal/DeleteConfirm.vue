<template>
  <Transition name="modal">
    <BaseModal class="modal-primary" :name="ModalName.DELETE_CONFIRM">
      <template #top>
        <h3 class="title">Are you sure you want to delete this card?</h3>
      </template>
      <div class="content">
        <div class="buttons">
          <BaseButton type="primary red" @click="onDeleteClick">Delete</BaseButton>
          <BaseButton type="primary" @click="onCancelClick">Cancel</BaseButton>
        </div>
      </div>
    </BaseModal>
  </Transition>
</template>

<script setup>
import { ModalName } from '@/constants/modal';
import { storeToRefs } from 'pinia';
import { useLayoutStore } from '@/stores/LayoutStore';
import { useCardsStore } from '@/stores/CardsStore';
import BaseModal from '@/components/Base/Modal.vue';
import BaseButton from '@/components/Base/Button.vue';

defineOptions({
  name: 'ModalDeleteConfirm',
});

const store = useLayoutStore();
const cardsStore = useCardsStore();
const { activeCard } = storeToRefs(cardsStore);
const { deleteCard } = cardsStore;

const onDeleteClick = () => {
  if (!activeCard.value) return;
  deleteCard(activeCard.value);
  store.HIDE_Modal();
};

const onCancelClick = () => {
  store.HIDE_Modal();
};
</script>

<style scoped lang="scss">
.modal-primary {
  :deep(.modal-inner) {
    max-width: 32%;
    padding: 32px;

    @media (max-width: $sm) {
      max-width: 100%;
    }

    .title {
      font-weight: 600;
      font-size: 20px;
      line-height: 150%;
      letter-spacing: -0.4px;
      text-align: center;
      text-wrap: balance;
      padding: 0 32px;
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 16px;

      .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        width: 100%;

        .btn {
          flex: 1;
        }
      }
    }
  }
}
</style>
