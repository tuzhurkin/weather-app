<template>
  <div class="base-switcher" :class="{ bg }">
    <BaseButton
      v-for="(option, index) in options"
      :key="option.key || index"
      :tag="option.to ? 'router-link' : 'button'"
      :to="option.to ?? null"
      :class="{ active: option.value === activeValue }"
      @click="onOptionClick(option, index)"
    >
      {{ option.text }}
    </BaseButton>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from '@/components/Base/Button.vue';

defineOptions({
  name: 'BaseSwitcher',
});

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [String, Number, Boolean, Object, null],
    default: null,
  },
  bg: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const route = useRoute();

const activeValue = computed(() => {
  if (!props.options.length) return null;

  const hasLinks = props.options.some(option => option.to);
  if (hasLinks) {
    const routePath = route.path ?? '';
    const activeOption = props.options.find(option =>
      option.to ? option.to === routePath : false
    );
    return activeOption.value ?? null;
  }

  const activeOption = props.options.find(option => option?.value === props.modelValue);
  return activeOption.value ?? null;
});

const onOptionClick = option => {
  if (option?.to) return;

  emit('update:modelValue', option.value);
};
</script>

<style scoped lang="scss">
.base-switcher {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  &.bg {
    padding: 8px;
    margin: 0 auto;
    background-color: $color-grey-600;
    border-radius: 32px;
  }

  &:not(.bg) {
    :deep(.btn) {
      min-width: 50px;
      min-height: 50px;
      padding: 0;
    }
  }

  :deep(.btn) {
    &.active {
      color: $color-black;
      background-color: $color-yellow;
    }
  }
}
</style>
