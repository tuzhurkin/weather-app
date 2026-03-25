<template>
  <component
    :is="tag"
    class="btn"
    :class="[type, { disabled }]"
    :type="tag === 'button' ? tagType : null"
    :to="to || undefined"
    :href="href"
    :target="target"
    :disabled="tag === 'button' ? disabled : null"
    @click="emit('click')"
  >
    <BaseIcon v-if="iconBefore" :name="iconBefore" class="before" />
    <span v-if="text">{{ text }}</span>
    <slot></slot>
    <BaseIcon v-if="icon" :name="icon" class="after" @click="emit('icon-click')" />
  </component>
</template>

<script setup>
import BaseIcon from '@/components/Base/Icon.vue';

defineOptions({
  name: 'BaseButton',
});

defineProps({
  tag: {
    type: String,
    default: 'button', // "a" | "router-link"
  },
  tagType: {
    type: String,
    default: 'button',
  },
  type: {
    type: [String, null],
    default: 'primary',
  },
  text: {
    type: [String, Number, null],
    default: null,
  },
  to: {
    type: [String, Object, null],
    default: null,
  },
  href: {
    type: [String, null],
    default: null,
  },
  target: {
    type: [String, null],
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  iconBefore: {
    type: [String, null],
    default: null,
  },
  icon: {
    type: [String, null],
    default: null,
  },
});

const emit = defineEmits(['click', 'icon-click']);
</script>

<style scoped lang="scss">
button,
.btn {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  width: auto;
  height: auto;
  border: none;
  outline: none;
  box-shadow: none;
  background: none;
  text-decoration: none;
  @include noTap;
  @include maskSafari;

  flex-shrink: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  will-change: transform;

  :deep(.icon) {
    flex-shrink: 0;
    overflow: visible;

    path {
      &[stroke] {
        transition: stroke $transition ease;
      }
      &[fill] {
        transition: fill $transition ease;
      }
    }
  }

  &.primary {
    column-gap: 10px;
    min-height: 50px;
    height: auto;
    padding: 0 12px;
    border-radius: 6px;
    border: 2px solid $color-blue-dark;
    background-color: $color-blue;
    transition:
      color $transition ease,
      background-color $transition ease,
      border-color $transition ease,
      transform $transition ease;

    font-family: $main-font;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: $color-white;

    span {
      font-family: inherit;
      font-style: inherit;
      font-weight: inherit;
      font-size: inherit;
      line-height: inherit;
      letter-spacing: inherit;
      color: inherit;
    }
    :deep(.icon) {
      width: 24px;
      height: 24px;
      object-fit: contain;
      object-position: center;

      path[stroke] {
        transition: stroke $transition ease;
        stroke: $color-white;
      }
      path[fill] {
        transition: fill $transition ease;
        fill: $color-white;
      }
    }
    @include hover {
      background-color: $color-blue-dark;
      :deep(.icon) {
        path[stroke] {
          stroke: $color-black;
        }
        path[fill] {
          fill: $color-black;
        }
      }
    }
    &:focus {
      background-color: $color-blue-dark;
      :deep(.icon) {
        path[stroke] {
          stroke: $color-white;
        }
        path[fill] {
          fill: $color-white;
        }
      }
    }
    &:active {
      transform: scale(0.97);
      background-color: $color-blue-dark;
      :deep(.icon) {
        path[stroke] {
          stroke: $color-white;
        }
        path[fill] {
          fill: $color-white;
        }
      }
    }
    &:disabled,
    &.disabled {
      pointer-events: none;
      cursor: default;
      color: $color-grey-disabled;
      border-color: $color-grey-500;
      background-color: $color-white;
      :deep(.icon) {
        path[stroke] {
          stroke: $color-grey-500;
        }
        path[fill] {
          fill: $color-grey-500;
        }
      }
    }
  }

  &.icony {
    min-width: 36px;
    min-height: 36px;
    height: auto;
    border-radius: 6px;
    border: 2px solid $color-grey-110;
    background-color: $color-grey-100;
    transition:
      color $transition ease,
      background-color $transition ease,
      border-color $transition ease,
      transform $transition ease;

    :deep(.icon) {
      width: 24px;
      height: 24px;
      object-fit: contain;
      object-position: center;

      path[stroke] {
        transition: stroke $transition ease;
        stroke: $color-grey-120;
      }
      path[fill] {
        transition: fill $transition ease;
        fill: $color-grey-120;
      }
    }
    @include hover {
      background-color: $color-white;
      :deep(.icon) {
        path[stroke] {
          stroke: $color-grey-120;
        }
        path[fill] {
          fill: $color-grey-120;
        }
      }
    }
    &:focus {
      background-color: $color-white;
      :deep(.icon) {
        path[stroke] {
          stroke: $color-grey-120;
        }
        path[fill] {
          fill: $color-grey-120;
        }
      }
    }
    &:active {
      transform: scale(0.97);
      background-color: $color-white;
      :deep(.icon) {
        path[stroke] {
          stroke: $color-grey-120;
        }
        path[fill] {
          fill: $color-grey-120;
        }
      }
    }
    &:disabled,
    &.disabled {
      pointer-events: none;
      cursor: default;
      border-color: $color-grey-160;
      background-color: $color-grey-150;
      :deep(.icon) {
        path[stroke] {
          stroke: $color-grey-170;
        }
        path[fill] {
          fill: $color-grey-170;
        }
      }
    }
  }

  &.texted {
    column-gap: 6px;
    font-family: $main-font;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: $color-grey-500;
    transition: color $transition ease;

    span {
      font-family: inherit;
      font-style: inherit;
      font-weight: inherit;
      font-size: inherit;
      line-height: inherit;
      letter-spacing: inherit;
      color: inherit;
    }
    :deep(.icon) {
      width: 16px;
      height: 16px;
      object-fit: contain;
      object-position: center;

      path[stroke] {
        transition: stroke $transition ease;
      }
      path[fill] {
        transition: fill $transition ease;
      }
    }
    @include hover {
      color: $color-black;
      :deep(.icon) {
        path[stroke] {
          stroke: $color-black;
        }
        path[fill] {
          fill: $color-black;
        }
      }
    }
    &:focus {
      color: $color-black;
      :deep(.icon) {
        path[stroke] {
          stroke: $color-black;
        }
        path[fill] {
          fill: $color-black;
        }
      }
    }
    &:active {
      color: $color-black;
      :deep(.icon) {
        path[stroke] {
          stroke: $color-black;
        }
        path[fill] {
          fill: $color-black;
        }
      }
    }
    &:disabled,
    &.disabled {
      pointer-events: none;
      cursor: default;
      color: $color-grey-disabled;
      :deep(.icon) {
        path[stroke] {
          stroke: $color-grey-disabled;
        }
        path[fill] {
          fill: $color-grey-disabled;
        }
      }
    }
  }
}
</style>
