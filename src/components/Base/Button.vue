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

    path,
    rect,
    circle {
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
    padding: 0 32px;
    border-radius: 32px;
    border: 2px solid $color-yellow;
    background-color: transparent;
    transition:
      color $transition ease,
      background-color $transition ease,
      border-color $transition ease,
      transform $transition ease;

    font-family: $main-font;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
    color: $color-yellow;

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

      path[stroke],
      rect[stroke],
      circle[stroke] {
        transition: stroke $transition ease;
        stroke: $color-yellow;
      }
      path[fill],
      rect[fill],
      circle[fill] {
        transition: fill $transition ease;
        fill: $color-yellow;
      }
    }
    @include hover {
      border-color: $color-yellow-hover;
      color: $color-yellow-hover;

      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-yellow-hover;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-yellow-hover;
        }
      }
    }
    &:focus {
      border-color: $color-yellow-hover;
      color: $color-yellow-hover;

      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-yellow-hover;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-yellow-hover;
        }
      }
    }
    &:active {
      transform: scale(0.97);
      border-color: $color-yellow-hover;
      color: $color-yellow-hover;

      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-yellow-hover;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-yellow-hover;
        }
      }
    }
    &:disabled,
    &.disabled {
      pointer-events: none;
      cursor: default;
      border-color: $color-grey-500;
      color: $color-grey-500;

      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-grey-500;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-grey-500;
        }
      }
    }

    &.yellow {
      background-color: $color-yellow;
      border-color: $color-yellow;
      color: $color-black;

      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-black;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-black;
        }
      }
      @include hover {
        background-color: $color-yellow-hover;
        border-color: $color-yellow-hover;
      }
      &:focus {
        background-color: $color-yellow-hover;
        border-color: $color-yellow-hover;
      }
      &:active {
        transform: scale(0.97);
        background-color: $color-yellow-hover;
        border-color: $color-yellow-hover;
      }
      &:disabled,
      &.disabled {
        background-color: $color-grey-500;
        border-color: $color-grey-500;
      }
    }

    &.green {
      background-color: $color-green;
      border-color: $color-green;
      color: $color-black;

      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-black;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-black;
        }
      }
      @include hover {
        background-color: $color-green-hover;
        border-color: $color-green-hover;
      }
      &:focus {
        background-color: $color-green-hover;
        border-color: $color-green-hover;
      }
      &:active {
        background-color: $color-green-hover;
        border-color: $color-green-hover;
      }
      &:disabled,
      &.disabled {
        background-color: $color-grey-500;
        border-color: $color-grey-500;
      }
    }

    &.red {
      background-color: $color-error;
      border-color: $color-error;
      color: $color-black;

      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-black;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-black;
        }
      }
      @include hover {
        background-color: $color-error-hover;
        border-color: $color-error-hover;
      }
      &:focus {
        background-color: $color-error-hover;
        border-color: $color-error-hover;
      }
      &:active {
        background-color: $color-error-hover;
        border-color: $color-error-hover;
      }
      &:disabled,
      &.disabled {
        background-color: $color-grey-500;
        border-color: $color-grey-500;
      }
    }
  }

  &.icony {
    min-width: 36px;
    min-height: 36px;
    height: auto;
    border-radius: 6px;
    border: 2px solid $color-yellow;
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

      path[stroke],
      rect[stroke],
      circle[stroke] {
        transition: stroke $transition ease;
        stroke: $color-yellow;
      }
      path[fill],
      rect[fill],
      circle[fill] {
        transition: fill $transition ease;
        fill: $color-yellow;
      }
    }
    @include hover {
      border-color: $color-yellow-hover;
      // background-color: $color-white;
      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-yellow-hover;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-yellow-hover;
        }
      }
    }
    &:focus {
      border-color: $color-yellow-hover;
      // background-color: $color-white;
      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-yellow-hover;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-yellow-hover;
        }
      }
    }
    &:active {
      transform: scale(0.97);
      border-color: $color-yellow-hover;
      // background-color: $color-white;
      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-yellow-hover;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-yellow-hover;
        }
      }
    }
    &:disabled,
    &.disabled {
      pointer-events: none;
      cursor: default;
      border-color: $color-grey-500;
      background-color: transparent;
      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-grey-500;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-grey-500;
        }
      }
    }
  }

  &.texted {
    column-gap: 6px;
    font-family: $main-font;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 150%;
    color: $color-grey-200;
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

      path[stroke],
      rect[stroke],
      circle[stroke] {
        transition: stroke $transition ease;
        stroke: $color-grey-200;
      }
      path[fill],
      rect[fill],
      circle[fill] {
        transition: fill $transition ease;
        fill: $color-grey-200;
      }
    }
    @include hover {
      color: $color-white;
      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-white;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-white;
        }
      }
    }
    &:focus {
      color: $color-white;
      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-white;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-white;
        }
      }
    }
    &:active {
      color: $color-white;
      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-white;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-white;
        }
      }
    }
    &:disabled,
    &.disabled {
      pointer-events: none;
      cursor: default;
      color: $color-grey-500;
      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-grey-500;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-grey-500;
        }
      }
    }
  }
}
</style>
