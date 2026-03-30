<template>
  <div class="tabs">
    <BaseButton
      :class="{ active: activeTab === 'day', transitioning: isTransitioning }"
      :text="translate('24h')"
      @click="setTab('day')"
    />
    <BaseButton
      :class="{ active: activeTab === 'week', transitioning: isTransitioning }"
      :text="translate('5d')"
      @click="setTab('week')"
    />
  </div>
  <div class="chart" :class="tabDirection && `chart--${tabDirection}`">
    <div class="panel" :class="{ active: activeTab === 'day' }" :style="{ position: dayPos }">
      <CardForecast :forecast="card.dayForecast" />
    </div>
    <div class="panel" :class="{ active: activeTab === 'week' }" :style="{ position: weekPos }">
      <CardForecast :forecast="card.weekForecast" />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import BaseButton from '@/components/Base/Button.vue';
import CardForecast from '@/components/Card/Forecast.vue';
import { useTranslates } from '@/composables/useTranslates';

defineOptions({
  name: 'CardChartTabs',
});

defineProps({
  card: {
    type: Object,
    default: () => ({}),
  },
});

const { translate } = useTranslates();

const TAB_DURATION = 500;
const activeTab = ref('day');
const tabDirection = ref(null);
const dayPos = ref('relative');
const weekPos = ref('absolute');
const isTransitioning = ref(false);
let switchTimer = null;
let enableTimer = null;

const setTab = tab => {
  if (tab === activeTab.value) return;
  clearTimeout(switchTimer);
  clearTimeout(enableTimer);

  isTransitioning.value = true;
  tabDirection.value = tab === 'week' ? 'next' : 'prev';
  activeTab.value = tab;

  if (tab === 'week') {
    weekPos.value = 'absolute';
    dayPos.value = 'relative';
  } else {
    dayPos.value = 'absolute';
    weekPos.value = 'relative';
  }

  switchTimer = setTimeout(() => {
    if (tab === 'week') {
      weekPos.value = 'relative';
      dayPos.value = 'absolute';
    } else {
      dayPos.value = 'relative';
      weekPos.value = 'absolute';
    }
  }, TAB_DURATION);

  // disable buttons during in and out transitions
  enableTimer = setTimeout(() => {
    isTransitioning.value = false;
  }, TAB_DURATION * 2);
};

onBeforeUnmount(() => {
  clearTimeout(switchTimer);
  clearTimeout(enableTimer);
});
</script>

<style scoped lang="scss">
$tab-duration: 500ms;

.tabs {
  display: flex;
  align-items: center;
  column-gap: 8px;

  :deep(.btn) {
    min-width: 50px;
    padding: 0;

    &.active {
      background-color: $color-yellow;
      color: $color-black;
    }
    &.transitioning {
      pointer-events: none;
      cursor: default;
    }
  }
}

.chart {
  position: relative;
}

.panel {
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  opacity: 0;
  transition: opacity $tab-duration $easeIn-1;

  &.active {
    pointer-events: all;
    opacity: 1;
    transition: opacity $tab-duration $easeOut-1 $tab-duration;
  }
}

.chart--next {
  .panel {
    animation: chartSlideOutLeft $tab-duration $easeIn-1;
    &.active {
      animation: chartSlideInRight $tab-duration $easeOut-1 $tab-duration;
    }
  }
}

.chart--prev {
  .panel {
    animation: chartSlideOutRight $tab-duration $easeIn-1;
    &.active {
      animation: chartSlideInLeft $tab-duration $easeOut-1 $tab-duration;
    }
  }
}

@keyframes chartSlideInRight {
  from {
    transform: translateX(20%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes chartSlideOutLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-20%);
  }
}

@keyframes chartSlideInLeft {
  from {
    transform: translateX(-20%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes chartSlideOutRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(20%);
  }
}
</style>
