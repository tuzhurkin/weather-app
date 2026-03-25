<template>
  <div class="loading" :class="{ absolute, fixed }">
    <svg
      version="1.1"
      id="L9"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enable-background="new 0 0 0 0"
      xml:space="preserve"
    >
      <path
        fill="#000000"
        d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
      />
    </svg>
  </div>
</template>

<script setup>
defineOptions({
  name: 'BaseLoading',
});

defineProps({
  absolute: {
    type: Boolean,
    default: false,
  },
  fixed: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
@keyframes rotate {
  0% {
    transform: rotate(0deg);
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    transform: rotate(360deg);
    opacity: 1;
  }
}

.loading {
  display: table;
  margin: auto;
  z-index: 50;

  svg {
    width: 150px;
    height: 150px;
    animation: rotate 1.5s linear infinite;

    path {
      fill: $color-blue;
    }
  }

  &.absolute {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
  }

  &.fixed {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.5);
  }
}
</style>
