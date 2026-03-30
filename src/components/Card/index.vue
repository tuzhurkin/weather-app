<template>
  <div class="card">
    <div v-if="isMobile" class="cover cover--mobile"></div>
    <div class="top">
      <div v-if="!isMobile" class="cover cover--top"></div>
      <div class="info">
        <div class="location">
          <BaseIcon name="stats/point-low" />
          <span>{{ card.city }}, {{ card.country }}</span>
        </div>
        <div class="temp-wrap">
          <div class="temp">{{ Math.round(card.temp) }}°C</div>
          <div v-if="!isMobile" class="feels-like">
            feels like: <span>{{ Math.round(card.feels_like) }}°C</span>
          </div>
        </div>
      </div>
    </div>
    <div class="middle">
      <div v-if="!isMobile" class="cover cover--middle"></div>
      <BaseIcon :name="icon" class="condition" />
      <div class="title">{{ card.title }}</div>
    </div>
    <div class="bottom">
      <div v-if="!isMobile" class="cover cover--bottom"></div>
      <div class="stats">
        <CardStat name="temp_max" :value="Math.round(card.temp_max) + '°C'" />
        <CardStat name="temp_min" :value="Math.round(card.temp_min) + '°C'" />
        <CardStat name="wind" :value="card.wind + ' km/h'" />
        <CardStat name="humidity" :value="card.humidity + '%'" />
      </div>
    </div>
    <div class="controls" :class="{ shown: isPageSaved }">
      <BaseButton
        type="icony"
        icon="bookmark"
        :class="{ saved: isCardSaved }"
        @click="onSaveClick"
      />
      <BaseButton v-if="!isPageSaved" type="icony" icon="trash" @click="onDeleteClick" />
    </div>
    <div class="chart">
      <div v-if="!isMobile" class="cover cover--chart"></div>
      <CardForecast :forecast="card.dayForecast" />
      <!-- <CardForecast :forecast="card.weekForecast" /> -->
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { CONDITIONS } from '@/constants/conditions';
import { storeToRefs } from 'pinia';
import { ModalName } from '@/constants/modal';
import { useLayoutStore } from '@/stores/LayoutStore';
import { useCardsStore } from '@/stores/CardsStore';
import BaseIcon from '@/components/Base/Icon.vue';
import BaseButton from '@/components/Base/Button.vue';
import CardStat from '@/components/Card/Stat.vue';
import CardForecast from '@/components/Card/Forecast.vue';

defineOptions({
  name: 'Card',
});

const props = defineProps({
  card: {
    type: Object,
    default: () => ({}),
  },
});

const store = useLayoutStore();
const cardsStore = useCardsStore();
const { savedCards, isPageSaved } = storeToRefs(cardsStore);
const { saveCard, unsaveCard, setActiveCard } = cardsStore;

const isMobile = computed(() => store.IS_Mobile);

const icon = computed(() => {
  return `conditions/${CONDITIONS[props.card.icon]}`;
});

const isCardSaved = computed(() => {
  return savedCards.value.some(c => c.id === props.card.id);
});

const onSaveClick = () => {
  if (isCardSaved.value) {
    unsaveCard(props.card);
  } else {
    saveCard(props.card);
  }
};

const onDeleteClick = () => {
  setActiveCard(props.card);
  store.SHOW_Modal(ModalName.DELETE_CONFIRM);
};
</script>

<style scoped lang="scss">
.card {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  column-gap: 16px;
  row-gap: 32px;
  padding: 32px 100px;
  width: 100%;
  color: $color-grey-200;
  border-radius: 50px;
  background: linear-gradient(150deg, $color-grey-600 0%, $color-grey-750 105%);

  @media (max-width: $sm) {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    padding: 24px 16px;
    border-radius: 24px;
  }

  .condition {
    position: relative;
    width: 120px;
    height: 120px;

    @media (max-width: $sm) {
      width: 150px;
      height: 150px;
    }

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
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 36px;
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
    letter-spacing: 0.01em;
    text-align: center;

    @media (max-width: $sm) {
      font-weight: 600;
      font-size: 28px;
      line-height: 150%;
    }
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

  .temp-wrap {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .temp {
    font-weight: 500;
    font-size: 88px;
    line-height: 100%;
  }

  .feels-like {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 4px;
    min-height: 36px;
    padding: 0 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    text-align: center;
    border-radius: 50px;
    color: $color-grey-300;
    background-color: $color-grey-750;

    span {
      color: $color-grey-200;
    }
  }

  .top {
    position: relative;
    display: flex;

    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;

      @media (max-width: $sm) {
        align-items: center;
        gap: 24px;
        width: 100%;
      }
    }
  }

  .middle {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .bottom {
    position: relative;
    display: flex;
    justify-content: flex-end;
    padding-right: 16px;

    @media (max-width: $sm) {
      justify-content: center;
      padding-right: 0;
    }

    .stats {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 12px;
      padding: 4px 0;

      @media (max-width: $sm) {
        display: block;
        column-count: 2;
        column-gap: 8px;
        width: 100%;
        padding: 0;
        margin-top: 16px;
      }

      .stat {
        @media (max-width: $sm) {
          margin-bottom: 16px;
        }
      }
    }
  }

  .chart {
    position: relative;
    grid-column: 1 / -1;
  }

  .controls {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 36px;
    position: absolute;
    top: 32px;
    right: 36px;
    height: 178px; // calc(100% - 72px);
    padding: 4px 0;

    opacity: 0;
    pointer-events: none;
    transition: opacity $transition ease;

    &.shown {
      opacity: 1;
      pointer-events: auto;
    }

    @media (max-width: $sm) {
      justify-content: flex-start;
      gap: 24px;
      top: 16px;
      right: 16px;

      opacity: 1;
      pointer-events: auto;
    }

    :deep(.btn) {
      width: 36px;
      height: 36px;
      border: none;

      &.saved {
        .icon {
          &.bookmark {
            path[stroke] {
              stroke: $color-green;
            }
            path[fill] {
              fill: $color-green;
            }
          }
        }
      }

      .icon {
        width: 36px;
        height: 36px;

        &.bookmark {
          @include hover {
            path[stroke] {
              stroke: $color-green;
            }
            path[fill] {
              fill: $color-green;
            }
          }
        }

        &.trash {
          @include hover {
            path[stroke] {
              stroke: $color-error;
            }
            path[fill] {
              fill: $color-error;
            }
          }
        }
      }
    }
  }

  @include hover {
    .controls {
      opacity: 1;
      pointer-events: auto;
    }
  }

  // >>> reveal cover animation <<<
  $gradient-color-0: #e8960a;
  $gradient-color-1: $color-yellow;
  $gradient-color-2: $color-yellow-hover;
  $gradient-color-3: #f7d070;

  .cover {
    position: absolute;
    inset: 0;
    pointer-events: none;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    animation-fill-mode: both;

    &--top {
      top: -32px;
      left: -100px;
      right: 20px; // 36px;
      bottom: -32px;
      z-index: 10;
      background: linear-gradient(90deg, $gradient-color-0 0%, $gradient-color-1 100%);
      animation-name: section-cover-reveal;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
    }

    &--middle {
      top: -32px;
      left: -52px;
      right: -68px; // -52px;
      bottom: -32px;
      z-index: 10;
      background: linear-gradient(90deg, $gradient-color-1 0%, $gradient-color-2 100%);
      animation-name: section-cover-reveal;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
    }

    &--bottom {
      top: -32px;
      left: 36px;
      right: -100px;
      bottom: -32px;
      z-index: 10;
      background: linear-gradient(90deg, $gradient-color-2 0%, $gradient-color-3 100%);
      animation-name: section-cover-reveal;
      animation-duration: 0.5s;
      animation-delay: 0.5s;
    }

    &--chart {
      top: -32px;
      bottom: -32px;
      left: -100px;
      right: -100px;
      z-index: 10;
      background: linear-gradient(
        90deg,
        $gradient-color-0 0%,
        $gradient-color-1 40%,
        $gradient-color-2 60%,
        $gradient-color-3 100%
      );
      animation-name: chart-cover-reveal;
      animation-duration: 0.5s;
      animation-delay: 0.7s;
    }

    &--mobile {
      z-index: 10;
      background: linear-gradient(
        90deg,
        $gradient-color-0 0%,
        $gradient-color-1 40%,
        $gradient-color-2 60%,
        $gradient-color-3 100%
      );
      animation-name: chart-cover-reveal;
      animation-duration: 0.8s;
      animation-delay: 0.3s;
    }
  }

  @keyframes section-cover-reveal {
    from {
      clip-path: inset(0 0 0 0);
    }
    to {
      clip-path: inset(0 0 100% 0);
    }
  }

  @keyframes chart-cover-reveal {
    from {
      clip-path: inset(0 0 0 0);
    }
    to {
      clip-path: inset(100% 0 0 0);
    }
  }
}
</style>
