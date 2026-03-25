<template>
  <div
    class="select"
    :class="[{ active: open, focused, disabled }, direction]"
    v-on-click-outside="onClickOutside"
  >
    <div class="trigger" :tabindex="disabled ? -1 : 0" @click="toggle">
      <span class="value">{{ displayValue }}</span>
      <BaseIcon name="chevron-down" />
    </div>
    <Transition name="options">
      <div v-show="open" class="options">
        <div class="options-inner">
          <div
            v-for="option in options"
            :key="option.value"
            class="option"
            :class="{ selected: isSelected(option.value) }"
            @click="selectOption(option)"
          >
            {{ option.text }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import BaseIcon from '@/components/Base/Icon.vue';

defineOptions({
  name: 'BaseSelect',
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
  disabled: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [String, Number, null],
    default: null,
  },
  focused: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
    default: 'bottom', // 'bottom' | 'top'
  },
  triggerText: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue', 'change']);

const open = ref(false);

const isSelected = value => {
  return props.modelValue === value;
};

const displayValue = computed(() => {
  if (!props.modelValue) return props.placeholder || '';
  const selected = props.options.find(option => String(option.value) === String(props.modelValue));
  const text = props.triggerText
    ? `${props.triggerText} ${selected?.text || ''}`
    : selected?.text || '';
  return text;
});

const toggle = () => {
  if (props.disabled) return;

  open.value = !open.value;
};

const onClickOutside = () => {
  if (open.value) open.value = false;
};

const selectOption = option => {
  emit('update:modelValue', option.value);
  emit('change', option);
  open.value = false;
};
</script>

<style scoped lang="scss">
.options-enter-active,
.options-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.options-enter-from,
.options-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.select {
  position: relative;
  width: 100%;

  @include hover {
    .trigger {
      border-color: $color-black;

      :deep(.icon) {
        path {
          stroke: $color-black;
        }
      }
    }
  }

  &.active {
    .trigger {
      border-color: $color-black;

      :deep(.icon) {
        transform: rotate(180deg);

        path {
          stroke: $color-black;
        }
      }
    }
  }

  &.focused {
    .trigger {
      border-color: $color-black;

      :deep(.icon) {
        path {
          stroke: $color-black;
        }
      }
    }
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &.top {
    .options {
      top: auto;
      bottom: calc(100% + 8px);
    }
  }

  .trigger {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 8px;
    width: 100%;
    height: 38px;
    padding: 8px 10px 8px 8px;
    border-radius: 6px;
    border: 1px solid $color-grey-500;
    background-color: transparent;
    transition: border-color $transition ease;
    cursor: pointer;
    @include noTap;

    &:focus {
      outline: none;
      border-color: $color-black;
    }

    .value {
      font-family: $main-font;
      font-weight: 400;
      font-size: 16px;
      line-height: 120%;
      letter-spacing: -0.28px;
      color: $color-grey-text;
      transition: color $transition ease;
      @include textOverflow;
    }

    :deep(.icon) {
      width: 16px;
      height: 16px;
      transition: transform $transition ease;

      path {
        stroke: $color-grey-500;
        transition: stroke $transition ease;
      }
    }
  }

  .options {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    z-index: 3;
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid $color-grey-500;
    background-color: $color-white;

    .options-inner {
      display: flex;
      flex-direction: column;
      row-gap: 16px;
      padding: 16px;
      max-height: 216px;
      overflow: auto;

      @include styledScrollbar(
        $trackbg: transparent,
        $thumbbg: $color-grey-500,
        $thumbbgactive: $color-grey-500,
        $radius: 8,
        $width: 2
      );

      .option {
        font-family: $main-font;
        font-weight: 500;
        font-size: 16px;
        line-height: 150%;
        letter-spacing: -0.32px;
        color: $color-grey-text;
        transition: color $transition ease;
        cursor: pointer;
        @include noTap;

        @include hover {
          color: $color-black;
        }

        &.selected {
          color: $color-black;
        }
      }
    }
  }
}
</style>
