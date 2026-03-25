<template>
  <BaseSelect
    :idx="idx"
    :name="name"
    :placeholder="placeholder"
    :focused="focused"
    :options="options"
    :disabled="disabled"
    :modelValue="modelValue"
    @update:modelValue="updateModelValue"
  />
</template>

<script setup>
import { ref, watch } from 'vue';
import BaseSelect from '@/components/Base/Select.vue';

defineOptions({
  name: 'BaseSorting',
});

const props = defineProps({
  idx: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [String, Number, null],
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const updateModelValue = value => {
  emit('update:modelValue', value, props.idx);
};

const focused = ref(false);

watch(
  () => props.modelValue,
  value => {
    focused.value = Boolean(value);
  }
);
</script>

<style scoped lang="scss"></style>
