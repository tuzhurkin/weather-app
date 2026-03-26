<template>
  <div class="card">
    <div class="top">
      <div class="location">
        <BaseIcon name="stats/point-low" />
        <span>{{ card.city }}, {{ card.country }}</span>
      </div>
      <div class="temp">{{ Math.round(card.temp) }}°C</div>
      <div class="feels-like"><span>feels like:</span> {{ Math.round(card.feels_like) }}°C</div>
    </div>
    <div class="middle">
      <BaseIcon :name="icon" class="condition" />
      <div class="title">{{ card.title }}</div>
    </div>
    <div class="bottom">
      <CardStat name="temp_min" :value="Math.round(card.temp_min) + '°C'" />
      <CardStat name="temp_max" :value="Math.round(card.temp_max) + '°C'" />
      <CardStat name="wind" :value="card.wind + ' km/h'" />
      <CardStat name="humidity" :value="card.humidity + '%'" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { CONDITIONS } from '@/constants/conditions';
// import { STATS } from '@/constants/stats';
import BaseIcon from '@/components/Base/Icon.vue';
import CardStat from '@/components/Card/Stat.vue';

defineOptions({
  name: 'Card',
});

const props = defineProps({
  card: {
    type: Object,
    default: () => ({}),
  },
});

const icon = computed(() => {
  return `conditions/${CONDITIONS[props.card.icon]}`;
});
</script>

<style scoped lang="scss">
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 32px 100px;
  width: 100%;
  border-radius: 50px;
  // background-color: $color-grey-750;
  background: linear-gradient(150deg, $color-grey-600 0%, $color-grey-750 103.55%);

  .condition {
    position: relative;
    width: 120px;
    height: 120px;

    :deep(svg) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 150%;
      height: 150%;
    }
  }

  .title {
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
    text-align: center;
  }

  .location {
    display: flex;
    align-items: center;
    gap: 12px;

    :deep(.icon) {
      width: 28px;
      height: 28px;
    }

    span {
      font-weight: 700;
      font-size: 20px;
      line-height: 150%;
      text-transform: uppercase;
    }
  }

  .top {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .temp {
      font-weight: 500;
      font-size: 88px;
      line-height: 100%;
    }

    .feels-like {
      padding: 8px 12px;
      font-weight: 400;
      font-size: 14px;
      line-height: 120%;
      text-align: center;
      border-radius: 50px;
      background-color: $color-grey-750;

      span {
        color: $color-grey-300;
      }
    }
  }

  .middle {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
