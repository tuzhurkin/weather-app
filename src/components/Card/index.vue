<template>
  <div class="card">
    <div class="top">
      <div class="location">
        <BaseIcon name="stats/point-low" />
        <span>{{ card.city }}, {{ card.country }}</span>
      </div>
      <div class="temp">{{ Math.round(card.temp) }}°C</div>
      <div class="feels-like">
        feels like: <span>{{ Math.round(card.feels_like) }}°C</span>
      </div>
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
    <div class="controls" :class="{ shown: isPageSaved }">
      <BaseButton
        type="icony"
        icon="bookmark"
        :class="{ saved: isCardSaved }"
        @click="saveCard(card)"
      />
      <BaseButton v-if="!isPageSaved" type="icony" icon="trash" @click="deleteCard(card)" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { CONDITIONS } from '@/constants/conditions';
import { storeToRefs } from 'pinia';
import { useCardsStore } from '@/stores/CardsStore';
import BaseIcon from '@/components/Base/Icon.vue';
import BaseButton from '@/components/Base/Button.vue';
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

const cardsStore = useCardsStore();
const { savedCards, isPageSaved } = storeToRefs(cardsStore);
const { saveCard, deleteCard } = cardsStore;

const icon = computed(() => {
  return `conditions/${CONDITIONS[props.card.icon]}`;
});

const isCardSaved = computed(() => {
  return savedCards.value.some(c => c.id === props.card.id);
});
</script>

<style scoped lang="scss">
.card {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // display: grid;
  // grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  column-gap: 16px;
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
    color: $color-grey-300;
    background-color: $color-grey-750;

    span {
      margin-left: 2px;
      color: $color-grey-200;
    }
  }

  .top,
  .middle,
  .bottom {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .bottom {
    padding-right: 32px;
  }

  .controls {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 32px;
    position: absolute;
    top: 50%;
    right: 36px;
    transform: translate(0, -50%);
    height: calc(100% - 88px);

    opacity: 0;
    pointer-events: none;
    transition: opacity $transition ease;

    &.shown {
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
}
</style>
