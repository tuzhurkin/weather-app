<template>
  <div class="card">
    <div class="top">
      <div class="info">
        <div class="location">
          <BaseIcon name="stats/point-low" />
          <span>{{ card.city }}, {{ card.country }}</span>
        </div>
        <div class="temp-wrap">
          <div class="temp">{{ Math.round(card.temp) }}°C</div>
          <div class="feels-like">
            feels like: <span>{{ Math.round(card.feels_like) }}°C</span>
          </div>
        </div>
      </div>
    </div>
    <div class="middle">
      <BaseIcon :name="icon" class="condition" />
      <div class="title">{{ card.title }}</div>
    </div>
    <div class="bottom">
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
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
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
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 36px;
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
    letter-spacing: 0.01em;
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
    display: flex;

    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  }

  .middle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;
  }

  .bottom {
    display: flex;
    justify-content: flex-end;
    padding-right: 32px;

    .stats {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 12px;
      padding: 4px 0;
    }
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
    height: calc(100% - 72px);

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
