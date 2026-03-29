<template>
  <canvas ref="chartRef"></canvas>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

const props = defineProps({
  chartData: Array,
});

const chartData = computed(() => props.chartData);
const chartRef = ref(null);
let chartInstance = null;

const prepareData = () => {
  return {
    labels: chartData.value.map(item => item.dt_txt.split(' ')[1].slice(0, 5)),
    temps: chartData.value.map(item => Math.round(item.main.temp)),
  };
};

// map -30°C … 0°C … +30°C
// hue 280 (purple) → hue 140 (green) → hue 0 (red)
const getBarColor = temp => {
  const clamped = Math.max(-30, Math.min(30, temp));
  const hue = Math.round(280 - ((clamped + 30) / 60) * 280);
  return `hsl(${hue}, 70%, 50%)`;
};

const renderChart = () => {
  const { labels, temps } = prepareData();

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(chartRef.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          data: temps,
          backgroundColor: temps.map(getBarColor),
          borderRadius: 16,
          barPercentage: 1.2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          backgroundColor: '#1e1e1e',
          padding: 10,
          titleFont: {
            size: 16,
            weight: 500,
            family: 'Figtree, sans-serif',
          },
          titleColor: '#dddddd',
          bodyFont: {
            size: 16,
            weight: 500,
            family: 'Figtree, sans-serif',
          },
          bodyColor: '#dddddd',
          callbacks: {
            label: ctx => ` ${ctx.raw}°C`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { color: '#dddddd' },
          ticks: {
            font: {
              size: 16,
              weight: 500,
              family: 'Figtree, sans-serif',
            },
            color: '#dddddd',
          },
        },
        y: {
          grid: { display: false },
          border: { color: '#dddddd' },
          ticks: {
            font: {
              size: 16,
              weight: 500,
              family: 'Figtree, sans-serif',
            },
            color: '#dddddd',
            callback: value => value + '°C',
          },
        },
      },
    },
  });
};

watch(() => chartData, renderChart);

onMounted(renderChart);

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy();
});
</script>

<style lang="scss" scoped></style>
