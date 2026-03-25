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
    <BaseButton type="texted" icon="search" :disabled="!modelValue" @click="onSearchButtonClick" />
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
  height: 38px;
  border-radius: 6px;
  border: 1px solid $color-grey-500;
  transition: border-color $transition ease;

  &.focused {
    border-color: $color-black;

    :deep(.btn) {
      border-color: $color-black;
      .icon {
        path[stroke] {
          stroke: $color-black;
        }
        path[fill] {
          fill: $color-black;
        }
      }
    }
  }

  :deep(.btn) {
    width: 36px;
    height: 36px;
    border-left: 1px solid $color-grey-500;
    transition: border-color $transition ease;
  }
}
</style>
