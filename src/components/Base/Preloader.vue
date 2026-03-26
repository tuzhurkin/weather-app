<template>
  <div class="preloader" :class="{ absolute, fixed }">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle fill="#89C0FF" stroke="#89C0FF" stroke-width="15" r="15" cx="40" cy="65">
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="1.2"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4"
        ></animate>
      </circle>
      <circle fill="#89C0FF" stroke="#89C0FF" stroke-width="15" r="15" cx="100" cy="65">
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="1.2"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2"
        ></animate>
      </circle>
      <circle fill="#89C0FF" stroke="#89C0FF" stroke-width="15" r="15" cx="160" cy="65">
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="1.2"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0"
        ></animate>
      </circle>
    </svg>
    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle fill="#000000" stroke="#000000" stroke-width="8" r="15" cx="35" cy="100">
        <animate
          attributeName="cx"
          calcMode="spline"
          dur="1.2"
          values="35;165;165;35;35"
          keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
          repeatCount="indefinite"
          begin="0"
        ></animate>
      </circle>
      <circle fill="#000000" stroke="#000000" stroke-width="8" opacity=".8" r="15" cx="35" cy="100">
        <animate
          attributeName="cx"
          calcMode="spline"
          dur="1.2"
          values="35;165;165;35;35"
          keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
          repeatCount="indefinite"
          begin="0.05"
        ></animate>
      </circle>
      <circle fill="#000000" stroke="#000000" stroke-width="8" opacity=".6" r="15" cx="35" cy="100">
        <animate
          attributeName="cx"
          calcMode="spline"
          dur="1.2"
          values="35;165;165;35;35"
          keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
          repeatCount="indefinite"
          begin=".1"
        ></animate>
      </circle>
      <circle fill="#000000" stroke="#000000" stroke-width="8" opacity=".4" r="15" cx="35" cy="100">
        <animate
          attributeName="cx"
          calcMode="spline"
          dur="1.2"
          values="35;165;165;35;35"
          keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
          repeatCount="indefinite"
          begin=".15"
        ></animate>
      </circle>
      <circle fill="#000000" stroke="#000000" stroke-width="8" opacity=".2" r="15" cx="35" cy="100">
        <animate
          attributeName="cx"
          calcMode="spline"
          dur="1.2"
          values="35;165;165;35;35"
          keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
          repeatCount="indefinite"
          begin=".2"
        ></animate>
      </circle>
    </svg> -->
  </div>
</template>

<script setup>
defineOptions({
  name: 'BasePreloader',
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
.preloader {
  display: table;
  margin: auto;
  z-index: 50;

  svg {
    display: block;
    width: 80px;
    height: 80px;
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
