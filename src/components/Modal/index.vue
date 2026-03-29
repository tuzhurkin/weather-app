<template>
  <div class="Modal">
    <!-- <client-only> -->
    <ModalAlreadyAdded />
    <ModalNoCitiesFound />
    <ModalDeleteConfirm />
    <ModalCardsLimit />
    <!-- </client-only> -->
  </div>
</template>

<script setup>
// import { ClientOnly } from 'vue';
import ModalAlreadyAdded from '@/components/Modal/AlreadyAdded.vue';
import ModalNoCitiesFound from '@/components/Modal/NoCititesFound.vue';
import ModalDeleteConfirm from '@/components/Modal/DeleteConfirm.vue';
import ModalCardsLimit from '@/components/Modal/CardsLimit.vue';

defineOptions({
  name: 'ModalGlobal',
});
</script>
