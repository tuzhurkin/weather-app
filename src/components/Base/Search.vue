<template>
  <label :for="idx" class="search" :class="{ focused }">
    <BaseInput
      :idx="idx"
      :name="name"
      :type="type"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :disabled="disabled"
      :modelValue="modelValue"
      @update:modelValue="updateModelValue"
      @focus="focus"
      @blur="blur"
    />
    <BaseButton type="icony" icon="search" :disabled="!modelValue" @click="onSearchButtonClick" />
  </label>
</template>

<script setup>
import { ref, watch } from 'vue';
import BaseInput from '@/components/Base/Input.vue';
import BaseButton from '@/components/Base/Button.vue';

defineOptions({
  name: 'BaseSearch',
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
  type: {
    type: String,
    default: 'text',
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  placeholder: {
    type: String,
    default: '',
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

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'search']);
const focused = ref(false);

const updateModelValue = value => {
  emit('update:modelValue', value, props.idx);
};

const focus = () => {
  focused.value = true;
};

const blur = () => {
  if (!props.modelValue) focused.value = false;
};

const onSearchButtonClick = () => {
  emit('search', props.modelValue);
};

watch(
  () => props.modelValue,
  value => {
    focused.value = Boolean(value);
  }
);
</script>

<style scoped lang="scss">
.search {
  display: flex;
  align-items: center;
  column-gap: 16px;
  transition: border-color $transition ease;

  &.focused {
    :deep(input) {
      border-color: $color-yellow-hover;
    }
  }

  :deep(input) {
    height: 56px;
    padding: 8px 24px;
    border-radius: 50px;
    color: $color-grey-200;
    border: 2px solid $color-yellow;
    background-color: $color-grey-800;
    transition: border-color $transition ease;
  }

  :deep(.btn) {
    width: 56px;
    height: 56px;
    border-radius: 50px;
    border-color: $color-yellow;
    transition: border-color $transition ease;

    .icon {
      path[stroke] {
        stroke: $color-yellow;
      }
      path[fill] {
        fill: $color-yellow;
      }
    }
  }
}
</style>
