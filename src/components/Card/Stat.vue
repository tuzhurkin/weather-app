<template>
  <div class="stat">
    <BaseIcon :name="icon" />
    <div class="value">{{ value }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { STATS } from '@/constants/stats';
import BaseIcon from '@/components/Base/Icon.vue';

defineOptions({
  name: 'CardStat',
});

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  value: {
    type: [String, Number],
    default: null,
  },
});

const icon = computed(() => {
  return `stats/${STATS[props.name]}`;
});
</script>

<style scoped lang="scss">
.stat {
  display: flex;
  align-items: center;
  gap: 12px;

  .icon {
    width: 28px;
    height: 28px;
  }

  .value {
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
  }
}
</style>
