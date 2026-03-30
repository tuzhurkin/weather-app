<template>
  <div class="card" :class="{ initial: card.isInitial }">
    <div v-if="isMobile && revealing" class="cover cover--mobile"></div>
    <div class="top">
      <div v-if="!isMobile && revealing" class="cover cover--top"></div>
      <div class="info">
        <div class="location">
          <BaseIcon name="stats/point-low" />
          <span class="name">{{ localizedCity }}, {{ card.country }}</span>
        </div>
        <div class="temp-wrap">
          <div class="temp">{{ Math.round(card.temp) }}°C</div>
          <div class="local-time">
            <BaseIcon name="clock" />
            <span>{{ localTime }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="middle">
      <div v-if="!isMobile && revealing" class="cover cover--middle"></div>
      <BaseIcon :name="icon" class="condition" />
      <div class="title">{{ localizedTitle }}</div>
    </div>
    <div class="bottom">
      <div v-if="!isMobile && revealing" class="cover cover--bottom"></div>
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
        :class="{ saved: isCardSaved(card) }"
        @click="onSaveClick"
      />
      <BaseButton v-if="!isPageSaved" type="icony" icon="trash" @click="onDeleteClick" />
    </div>
    <div v-if="!isMobile && revealing" class="cover cover--chart"></div>
    <CardChartTabs :card="card" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { CONDITIONS } from '@/constants/conditions';
import { storeToRefs } from 'pinia';
import { ModalName } from '@/constants/modal';
import { useLayoutStore } from '@/stores/LayoutStore';
import { useCardsStore } from '@/stores/CardsStore';
import { useLocale } from '@/composables/useLocale';
import BaseIcon from '@/components/Base/Icon.vue';
import BaseButton from '@/components/Base/Button.vue';
import CardStat from '@/components/Card/Stat.vue';
import CardChartTabs from '@/components/Card/ChartTabs.vue';

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
const { isPageSaved } = storeToRefs(cardsStore);
const { saveCard, unsaveCard, setActiveCard, isCardSaved } = cardsStore;
const { locale } = useLocale();

const isMobile = computed(() => store.IS_Mobile);

const isLocaleEn = computed(() => locale.value === 'en');
const localizedCity = computed(() => props.card.local_names?.[locale.value] || props.card.city);
const localizedTitle = computed(() =>
  isLocaleEn.value ? props.card.title : props.card.description
);

const icon = computed(() => {
  return `conditions/${CONDITIONS[props.card.icon]}`;
});

const onSaveClick = () => {
  isCardSaved(props.card) ? unsaveCard(props.card) : saveCard(props.card);
};

const onDeleteClick = () => {
  setActiveCard(props.card);
  store.SHOW_Modal(ModalName.DELETE_CONFIRM);
};

// local time clock
const localTime = ref('');
let clockTimer = null;

const updateLocalTime = () => {
  const offset = props.card.timezoneOffset ?? 0;
  const d = new Date((Date.now() / 1000 + offset) * 1000);
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mo = String(d.getUTCMonth() + 1).padStart(2, '0');
  const yyyy = d.getUTCFullYear();
  localTime.value = `${hh}:${mm} ${dd}/${mo}/${yyyy}`;
};

// reveal cover animation
const revealing = ref(true);
let cleanupTimer = null;

onMounted(() => {
  updateLocalTime();
  clockTimer = setInterval(updateLocalTime, 10000);

  cleanupTimer = setTimeout(() => {
    revealing.value = false;
  }, 2000);
});

onBeforeUnmount(() => {
  clearInterval(clockTimer);
  clearTimeout(cleanupTimer);
});
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

    @media (max-width: $sm) {
      align-items: center;
    }
  }

  .temp {
    font-weight: 500;
    font-size: 88px;
    line-height: 100%;
  }

  .feels-like,
  .local-time {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 8px;
    min-height: 36px;
    padding: 0 16px;
    font-weight: 400;
    font-size: 16px;
    line-height: 120%;
    text-align: center;
    border-radius: 50px;
    color: $color-grey-300;
    background-color: $color-grey-750;

    :deep(.icon) {
      width: 20px;
      height: 20px;
    }

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

  :deep(.chart) {
    grid-column: 1 / -1;
  }

  :deep(.tabs) {
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
  $cover-reveal-duration: 0.5s;

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
      animation-duration: $cover-reveal-duration;
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
      animation-duration: $cover-reveal-duration;
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
      animation-duration: $cover-reveal-duration;
      animation-delay: 0.5s;
    }

    &--chart {
      top: 218px; // = 32px top padding + 178px header height + 8px buffer // -100px
      bottom: 0; // -32px;
      left: 0; // -100px;
      right: 0; // -100px;
      z-index: 10;
      background: linear-gradient(
        90deg,
        $gradient-color-0 0%,
        $gradient-color-1 40%,
        $gradient-color-2 60%,
        $gradient-color-3 100%
      );
      animation-name: chart-cover-reveal;
      animation-duration: $cover-reveal-duration;
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

  &.initial {
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      padding: 2px;
      border-radius: 50px;
      background: linear-gradient(
        90deg,
        $gradient-color-0 0%,
        $gradient-color-1 40%,
        $gradient-color-2 60%,
        $gradient-color-3 100%
      );
      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask-composite: exclude;
      pointer-events: none;

      @media (max-width: $sm) {
        border-radius: 24px;
      }
    }

    .location {
      .icon {
        :deep(svg) {
          path[stroke],
          rect[stroke],
          circle[stroke] {
            stroke: $gradient-color-0;
          }
          path[fill],
          rect[fill],
          circle[fill] {
            fill: $gradient-color-0;
          }
        }
      }
      .name {
        background: linear-gradient(
          90deg,
          $gradient-color-0,
          $gradient-color-1,
          $gradient-color-2,
          $gradient-color-3
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
      }
    }
  }
}
</style>
